using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using project.Helpers;
using project.Models;

namespace project.Service
{
    public interface IBlogService
    {
        Payload Login(UserViewModel userVm);
        Payload Create(User user);
        User GetById(string id);
        Task<Payload> CreatePost(Post post);
        Task<Payload> UploadImage(IFormFile file);
        List<Post> GetPosts();
        Task<Payload> EditPost(Post post);
        Payload DeletePost(string id);
        Post GetUserPostById(string id);
        Task<Post> GetPostById(string id);
        List<Post> GetPostsByCategory(string category);
        List<Post> GetPostsById(string authorId);
    }
    public class BlogService : IBlogService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Post> _postCollection;
        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;
        private readonly string _uploadCareSecret;
        private readonly string _uploadCarePubKey;
        private readonly int _uploadCareExpiry;

        public BlogService(IConfiguration config)
        {
            // running the database on the default local server port
            var client = new MongoClient(config["MongoDbConnection:URL"]);
            var db = client.GetDatabase(config["MongoDbConnection:DatabaseName"]);
            _userCollection = db.GetCollection<User>("Users");
            _postCollection = db.GetCollection<Post>("Posts");
            _secretKey = config["JWT:Secret"];
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);

            // upload care keys
            _uploadCarePubKey = config["UploadCare:PubKey"];
            _uploadCareSecret = config["UploadCare:Secret"];
            _uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
        }

        public Payload Login(UserViewModel userVm)
        {
            // check if user exist
            var user = _userCollection.Find(x => x.Email == userVm.Email).FirstOrDefault();
            if (user == null)
            {
                Console.WriteLine(userVm.Email + " doesnt exist");
                return new Payload { StatusCode = 404, StatusDescription = "User doesn't exist." };
            }
            else
            {
                // decoding hash password
                bool isPasswordVerified = BCrypt.Net.BCrypt.Verify(userVm.Password, user.Password);
                if (!isPasswordVerified)
                {
                    Console.WriteLine("Password is incorrect");
                    return new Payload { StatusCode = 400, StatusDescription = "Password is incorrect. Did you forget your password?" };
                }
                else
                {
                    string token = Util.GenerateToken(user, _secretKey, "User", _tokenExpiryTime);

                    return new Payload
                    {
                        StatusCode = 200,
                        StatusDescription = token,
                    };
                }



            }


        }

        public Payload Create(User user)
        {
            // check if user with the email already exist or not
            var existingUser = _userCollection.Find(x => x.Email == user.Email).FirstOrDefault();
            if (existingUser != null)
            {
                Console.WriteLine("User with the email already exist");
                return new Payload { StatusCode = 404, StatusDescription = "User with the email already exist." };
            }
            else
            {
                // add user to the collection
                // create a hashed password
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                _userCollection.InsertOne(user);
                return new Payload { StatusCode = 200, StatusDescription = "User created successfully." };

            }

        }

        public User GetById(string id)
        {
            return _userCollection.Find(x => x.Id == id).FirstOrDefault();
        }

        async public Task<Payload> CreatePost(Post post)
        {
            try
            {
                // upload the image to the cloud bucket and then store the url
                var res = await UploadImage(post.CoverPhoto);
                if (res == null)
                {
                    return new Payload { StatusCode = 400, StatusDescription = "Couldn't upload image" };
                }

                post.CoverPhotoPreview = res.StatusDescription;
                // setting the file field to null as we won't be saving the file directly in the database
                post.CoverPhoto = null;

                // insert the post into database
                await _postCollection.InsertOneAsync(post);
                return new Payload { StatusCode = 200, StatusDescription = "Post created successfully." };

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Payload { StatusCode = 400, StatusDescription = e.Message };
            }

        }

        async public Task<Payload> UploadImage(IFormFile file)
        {

            string URL = $"https://upload.uploadcare.com/base/";
            HttpClient client = new HttpClient();

            // the following headers are required for the uploadcare API
            KeyValuePair<string, string> keys = Util.GenerateSignature(_uploadCareSecret, _uploadCareExpiry);

            MultipartFormDataContent form = new MultipartFormDataContent();
            // convert file to byte array
            byte[] data;
            using (var br = new BinaryReader(file.OpenReadStream()))
                data = br.ReadBytes((int)file.OpenReadStream().Length);

            ByteArrayContent bytes = new ByteArrayContent(data);
            form.Add(new StringContent(keys.Key), "expire");
            form.Add(new StringContent(keys.Value), "signature");
            form.Add(new StringContent(_uploadCarePubKey), "UPLOADCARE_PUB_KEY");
            form.Add(new StringContent("1"), "UPLOADCARE_STORE");
            form.Add(bytes, "file", file.FileName);

            HttpResponseMessage response = await client.PostAsync(URL, form);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Image uploaded successfully");
                var jo = JObject.Parse(response.Content.ReadAsStringAsync().Result);
                var fileUrl = jo["file"].ToString();
                Console.WriteLine(fileUrl);

                return new Payload { StatusCode = 200, StatusDescription = $"https://ucarecdn.com/{fileUrl}/" };

            }
            return null;
        }


        public List<Post> GetPosts()
        {
            return _postCollection.Find(x => true).ToList();
        }


        async public Task<Payload> EditPost(Post post)
        {
            Console.WriteLine("editing a post");
            Console.WriteLine(post.Title);

            try
            {
                // first check if the image has been updated or not
                if (post.CoverPhoto != null)
                {
                    // upload the image to the cloud bucket and then get the url
                    var result = await UploadImage(post.CoverPhoto);
                    post.CoverPhotoPreview = result.StatusDescription;
                    Console.WriteLine(post.CoverPhotoPreview);
                }

                var filter = Builders<Post>.Filter.Eq("Id", post.Id);
                var update = Builders<Post>.Update.
                        Set("Title", post.Title).
                        Set("Description", post.Description).
                        Set("Category", post.Category).
                        Set("CoverPhotoPreview", post.CoverPhotoPreview);

                var res = await _postCollection.UpdateOneAsync(filter, update);
                return new Payload { StatusCode = 200, StatusDescription = "Blog post edited successfully." };
            }
            catch (System.Exception e)
            {
                return new Payload { StatusCode = 400, StatusDescription = e.Message };

            }

        }

        public Payload DeletePost(string id)
        {
            try
            {
                var filter = Builders<Post>.Filter.Eq("Id", id);
                var res = _postCollection.DeleteOne(filter);
                return new Payload { StatusCode = 200, StatusDescription = "Blog post deleted successfully." };
            }
            catch (System.Exception e)
            {
                return new Payload { StatusCode = 400, StatusDescription = e.Message };
            }


        }

        /* for authenticated users */
        public Post GetUserPostById(string id)
        {
            try
            {
                var filter = Builders<Post>.Filter.Eq("Id", id);
                var projection = Builders<Post>.Projection.
                    Include("Title").
                    Include("Description").
                    Include("CoverPhotoPreview").
                    Include("CreatedAt").
                    Include("Category");

                var result = _postCollection.Find(filter).Project(projection).FirstOrDefault();
                return BsonSerializer.Deserialize<Post>(result);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        async public Task<Post> GetPostById(string id)
        {
            try
            {
                var filter = Builders<Post>.Filter.Eq("Id", id);
                var projection = Builders<Post>.Projection.
                    Include("Title").
                    Include("Description").
                    Include("AuthorId").
                    Include("CoverPhotoPreview").
                    Include("CreatedAt").
                    Include("Category");

                var result = await _postCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
                Post post = BsonSerializer.Deserialize<Post>(result);
                // find the user name from the post author id
                var user = await _userCollection.Find(x => x.Id == post.AuthorId).FirstOrDefaultAsync();
                if (user == null)
                {
                    return null;
                }
                post.Author = user.Name;
                return post;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }


        public List<Post> GetPostsByCategory(string category)
        {
            try
            {
                var filter = Builders<Post>.Filter.Eq("Category", category);
                var projection = Builders<Post>.Projection.
                    Include("Title").
                    Include("Description").
                    Include("CoverPhotoPreview").
                    Include("Category");

                var postsList = _postCollection.Find(filter).Project(projection).ToList();
                List<Post> posts = new List<Post>();
                foreach (var post in postsList)
                    posts.Add(BsonSerializer.Deserialize<Post>(post));

                return posts;
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }


        public List<Post> GetPostsById(string authorId)
        {
            try
            {
                return _postCollection.Find(x => x.AuthorId == authorId).ToList();
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

    }
}