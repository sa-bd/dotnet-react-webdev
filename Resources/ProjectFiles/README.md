## Workshop requirements

All participants are recommended to have the following skills to participate in this workshop: 

 - Basic understanding of C# language
 - Basic understanding of HTML, CSS and Javascript

## Installation

In this workshop, all the demonstration will be done using Visual Studio Code, which is a light-weight code editor. You are required to have the following tools and libraries installed before coming to the workshop:

1. [Visual Studio Code](https://code.visualstudio.com/download)
2. [Visual Studio Code Extensions](https://docs.google.com/document/d/1gNB-vaMqnpVvRyF61aaVBNnlt8tPn4eKC1CI0buNwgY/edit)
3. [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/thank-you/sdk-5.0.400-windows-x64-installer)
4. [Node.js](https://nodejs.org/en/download/)


## Topics we'll be covering:

- [Creating the react application](https://github.com/Propo41/msa-workshop/tree/main#creating-the-react-application)
- [Creating a dotnet project template](https://github.com/Propo41/msa-workshop/tree/main#creating-a-dotnet-project-template)
- [How Controllers work](https://github.com/Propo41/msa-workshop/tree/main#how-controllers-work)
- [Adding MongoDB](https://github.com/Propo41/msa-workshop/tree/main#adding-mongodb)
- [Creating User accounts](https://github.com/Propo41/msa-workshop/tree/main#creating-user-accounts)
- [Creating a JWT token](https://github.com/Propo41/msa-workshop/tree/main#creating-a-jwt-token)
- [Custom Middleware Authentication](https://github.com/Propo41/msa-workshop/tree/main#custom-middleware-authentication)
- [Creating Authenticated Endpoints & Cloud Bucket](https://github.com/Propo41/msa-workshop/tree/main#creating-authenticated-endpoints)

## What we're building

We are building a simple blogging website where users can post their content. The UI preview of the website can be found [here.](https://www.figma.com/file/8HuSGUDy2cTMpqNu8bC0mJ/MSA-Workshop-1?node-id=0:1)

Since our blogging website will have the least features, there can be only 2 Model classes: **User** and **Post**. 
The schema diagram will be as follows:

![image](https://user-images.githubusercontent.com/46298019/129452240-473ae90f-4045-46d6-923b-f6c68c64f568.png)

> *Note, the above design is not recommended in a NoSQL database. NoSQL databases are not relational but instead are structured. However, to keep things simple, we are using the above approach.*

Now, let's design the API list we will need for the project.

The public APIs: 
|Description |http  |API endpoint   |Request Body  |
|--|--|--|--|
|Fetch all posts  |GET  | /[post]/posts |  |
|Fetch a particular post by id |GET  | /[post]/:id |  |
|Fetch posts by category |GET  |/[post]?category=:name |  |
|Login a user  |POST  |/[user]/login |**UserLogin**: email!, password!  |
|Register a user  |POST  |/[user]/register  |**User**: name!, email!, password!, confirmPassword! |
<br>

The private APIs that should be authenticated: 
|Description |http  |API endpoint   |Request Body  |
|--|--|--|--|
|Fetch all user posts  |GET  |/[post]/auth/posts  |  |
|Fetch a particular post by id  |GET |/[post]/auth/:id  |  |
|Delete a post  |DELETE  |/[post]/auth  |string: id!  |
|Create a post  |POST  |/[post]/auth  |**Post**: title!, description!,  |
|Edit a post  |POST  |/[post]/auth/edit |**Post**: title?, description?, category?, coverPhoto?, file? |


## Getting Started

### Creating the react application

We first need to create the react project. Since this workshop mainly focuses on the backend development, we are going to use a pre-existing react application that can be found [here](https://github.com/Propo41/msa-workshop/tree/main/01_client). 

### Creating a dotnet project template

Dotnet comes with a number of pre-existing templates ready to be used by developers. 
Open a new terminal, and type the following command to see a list of all the available templates.
```bash
$ dotnet new
```
Now, since we are using a React application as our frontend, we are going to use the command:
```bash
$ dotnet new react
```
Copy the react application we made previously and replace the contents of the folder `ClientApp`. Install the react packages:
```bash
$ cd .\ClientApp\
$ npm install
$ cd ..
```

### How Controllers work

Delete the file `WeatherForecast.cs` and replace the contents of `./Controllers/WeatherForecastController.cs` with the following snippet and rename the file to `BurgerController.cs`. Next, run the following command to build and run the app to check if everything is working.
```bash
$ dotnet build
$ dotnet run
```

> *If we run the app using dotnet run, we have to re-run the
> project everything we make a change. Instead, we can run the project*
> *using:*
> ```bash
>$ dotnet watch run
>```



```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace demo.Controllers
{
    public class Burger
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class BurgerController : ControllerBase
    {
        private List<Burger> _burgers = new List<Burger>(){
            new Burger{Id=1, Name="Beef Fatty Cheese Burger", Price=250},
            new Burger{Id=2, Name="Best Chicken", Price=100},
            new Burger{Id=3, Name="Nahiyan's Special Double Patty", Price=450},
            new Burger{Id=4, Name="Creamy Cheese Sausage Burger with white sauce", Price=600},

        };

        [HttpGet]
        public string Get()
        {
            var msg = "Welcome to our Nahiyan Burger Shop";
            return msg;
        }

        // GET /burger/menu
        [HttpGet]
        [Route("menu")]
        public List<Burger> GetMenu()
        {
            return _burgers;
        }

        // POST /burger/add-item
        [HttpPost]
        [Route("add-item")]
        public Burger Add(Burger burger)
        {
            Console.WriteLine("Adding new burger item: ", burger.Name);
            return new Burger { Id = 4, Name = burger.Name, Price = burger.Price };
        }

        // GET /burger/item/2
        [HttpGet]
        [Route("item/{id}")]
        public Burger GetBurgerById(int id)
        {
            return _burgers.FirstOrDefault(x => x.Id == id);
        }

        // GET /burger/item?price=250&&condition=above
        [HttpGet]
        [Route("item")]
        public List<Burger> GetBurgerByPrice(int price, string condition)
        {
            if (condition == "above")
            {
                return _burgers.Where(x => x.Price > price).ToList();
            }
            else if (condition == "below")
            {
                return _burgers.Where(x => x.Price < price).ToList();
            }
            else
            {
                return _burgers.Where(x => x.Price == price).ToList();
            }
        }
    }
}
```

### Adding MongoDB

Now, we add [MongoDB driver](https://docs.mongodb.com/drivers/csharp/). 
```bash
$ dotnet add package MongoDB.Driver
```
For the workshop, we are going to use a local mongodb server that will be hosted in our computer by using the following connection string: `mongodb://localhost`

References:
- https://docs.mongodb.com/manual/crud/ 

### Creating User accounts

Let's start by adding a functionality to create a new user.
Firstly, we need to create a Model class for the `User` table. Create a new folder named, `Models` and create a model class representing Users.
Note that, we are using [ActionResult](https://www.c-sharpcorner.com/article/action-result-in-asp-net-mvc/) as the return type. ActionResult is a custom data type. There are several dervied data types. Check the link

*Models/User.cs*
```csharp 
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace project.Models
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                    @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                    @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                    ErrorMessage = "Email is not valid")]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [BsonIgnoreIfNull]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
```
Next, we create a new Controller named `UserController.cs`. 

```csharp
using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Service;

namespace project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public UserController(IBlogService _blogService)
        {
            this._blogService= _blogService;
        }

        [HttpPost]
        [Route("register")]
        public ActionResult Register(User user)
        {
            Payload res = _blogService.Create(user);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Someting is wrong", 400, res.StatusDescription));
            }
            return Ok(res);
        }
    }
}

```

As we can see, there's a class we defined called `BlogService`. This is a service class. A service class is a place where we keep all our business logics including database calls and other logic. In software development, such design patterns are encouraged since they are helpful when your application scales up or when you are working with other collaborators.

We also create a class called `Payload.cs` that will help sending data between our service class and controller class.

*Models/Payload.cs*
```csharp
namespace project.Models
{
    public class Payload
    {
        public int StatusCode { get; set; }
        public string StatusDescription { get; set; }
    }
}
```
Next, we add the credentials required for our database. A good practice to store private credentials is in the file `appsettings.json`. 

*appsettings.json*
```json
{
  "MongoDbConnection": {
    "DatabaseName": "Workshop",
    "URL": "mongodb://localhost"
  },
}
```

So, let's create the service class. 
Note that we are using an interface. This is called [**dependency inversion principle**](https://deviq.com/principles/dependency-inversion-principle).

> The Dependency Inversion Principle (DIP) states that high level modules should not depend on low level modules; both should depend on abstractions. Abstractions should not depend on details.  Details should depend upon abstractions.

*Service/BlogService.cs*
```csharp
namespace project.Service
{
    public interface IBlogService
    {
        Payload Create(User user);
    }
     public class BlogService : IBlogService
     {
	    private  readonly  IMongoCollection<User> _userCollection;
	    
		puvlic BlogService(IConfiguaration config)
		{
		    var client = new MongoClient(config["MongoDbConnection:URL"]);
            var db = client.GetDatabase(config["MongoDbConnection:DatabaseName"]);
            _userCollection = db.GetCollection<User>("Users");
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
    
    
     }
    
}
```
Next inject the Service class into our project from the `Startup.cs` file. This allows the class to automatically instantiate so that we can use them in our controller classes as a constructor parameter. 
> *This is called [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection).*

Note that we are using the method AddScoped(). There are other methods called AddTransient() or AddSingleton() which are used for different contexts. [Read more](https://www.ezzylearning.net/tutorial/asp-net-core-service-lifetimes-infographic/)

> AddScoped(): The service instance will be created once per request. All middlewares, MVC controllers, etc. that participate in handling of a single request will get the same instance. 


*Startup.cs*
```csharp
 public void ConfigureServices(IServiceCollection services)
 { 
	 services.AddScoped<IBlogService, BlogService>();
 } 
```

*UserController.cs*
```csharp
 private readonly IBlogService _blogService;

 public UserController(IBlogService _userService)
 {
     this._blogService = _userService;
 }
```
Now from the client side, we send a POST request sending the user information as payload. Note that the model validations are done automatically since we included the `[ApiController]` attribute.

```js
   const { data } = await axios.post(
        `https://localhost:5001/user/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }
   );
```

To catch out the errors, add this snippet and call this from the catch block of your try catch 

```js
 const parseError = (e) => {
    if (e.response) {
      const errors = e.response.data.errors;

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          console.log(key, errors[key]);
        }
      }
    }
  };
```

### Creating a JWT token

Now, since our user is logged in, we can sign in. But after the user signs in, how are we going to store the user session? Are we going to let the user sign in every single time after every page refresh? Well no. What we need is to make some sort of handshaking method. For example, after a user signs in, the server is going to generate a trusted signature (called a **JWT token**) and then send this signature back to the client. The client is going to save this token and whenever a new request is to be made to the server, the client will send this token along with the request. The server checks this token and if it is verified, the request is authenticated.

> *JWT stands for JSON Web Token. It is a security validation mechanism widely used nowadays. JWT is basically a string of random alphanumeric characters. There are three parts of a JWT separated by dots: **header**, **payload**, and **signature**.* [Reference](https://medium.com/dataseries/public-claims-and-how-to-validate-a-jwt-1d6c81823826)

**Header**:  contains the information about the type of the token and the algorithm used to generate the signature
**Payload**:  contains verifiable security statements, such as the identity of the user and the permissions they are allowed. The payload information is also referred to as Claims.
**Signature**:  it is generated using the given payload and a secret key. The server verifies this signature and allow authenticated routes if verfied. This is the most important part of the JWT token. Anyone with the access to the secret key, can mock your signature and penetrate your system.

![image](https://user-images.githubusercontent.com/46298019/129455104-352dc98c-ef71-41fd-aa12-287a47a432ff.png)

We need to add the following packages: 
```bash
$ dotnet add package Microsoft.AspNetCore.Authentication
$ dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
$ dotnet add package System.IdentityModel.Tokens.Jwt
$ dotnet add package BCrypt.Net-Next --version 4.0.2
$ dotnet add package Newtonsoft.Json --version 13.0.1
```
Now let's add the login method in our `UserController.cs`

*/Controller/UserController.cs*
```csharp
[HttpPost]
[Route("login")]
public ActionResult Login(UserViewModel user)
{
   Payload res = _blogService.Login(user);
   if (res.StatusCode != 200)
   {
       return new BadRequestObjectResult(new ErrorResult("Something is wrong", 400, res.StatusDescription));

   }
   return Ok(res);
}
```

The UserViewModel class is another model class that we created that contains only email and password as the required attributes. We could have used our old User class but we didn't as that class contained more than 2 attributes as required. 

*Models/UserViewModel.cs*
```csharp
using System.ComponentModel.DataAnnotations;

namespace project.Models
{
    public class UserViewModel
    {
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                                    @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                    @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                                    ErrorMessage = "Email is not valid")]
        [Required]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
```
In our service class, add the following snippet:

*/Service/BlogService.cs*

```csharp
 public interface IBlogService
 {
      Payload Login(UserViewModel userVm);
 }
 public class BlogService : IBlogService
 {
	  //...
      private readonly string _secretKey;
      private readonly int _tokenExpiryTime;
      
	  public  BlogService(IConfiguration  config)
	  {
		   //...  
		  _secretKey = config["JWT:Secret"];
		  _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);
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
 }

```

Next add the Util class in a folder named Helpers. This is responsible for generating the JWT token after a user signs in.

*Helpers/Util.cs*

```csharp
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using project.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;

namespace project.Helpers
{
    public static class Util
    {
        public static string GenerateToken(User user, string secret, string role, int expiryTime)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("role", role) }),
                Expires = DateTime.UtcNow.AddHours(expiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
```

Now, let's add the POST request in our client side login page
```js
 const { data } = await axios.post(`https://localhost:5001/user/login`, {
      email: form.email,
      password: form.password,
 });

 console.log(data); // the data will contain the JWT token
```


### Custom Middleware Authentication

Now that we got the JWT access token, we can start making our authenticated API endpoints.
C# can automatically make an API endpoint private by using the `[Authorize]` attribute or make them public by using the `[AllowAnonymous]` attribute. 

Now, if we just use these attributes, it's going to work perfectly out of the box. We can easily make endpoints private or anonymous. But what if we want to access the `UserId` that we stored earlier inside the JWT token? For that, we need to make a custom JWT [Middleware](https://www.tutorialsteacher.com/core/aspnet-core-middleware#:~:text=A%20middleware%20is%20nothing%20but,and%20executed%20in%20each%20request.). 

Add the following snippet:

*Helpers/JwtMiddleware.cs*
```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using project.Service;
using System.Linq;
using System.Threading.Tasks;

namespace project.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _secret;

        public JwtMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _secret = config["JWT:Secret"];
        }

        /*
         * Since we assigned JwtMiddleware as our custom middleware in the Startup.cs file ie: app.UseMiddleware<JwtMiddleware>();,
         * this method gets called implicitly
        */
        public async Task Invoke(HttpContext context, IBlogService userService)
        {
            // parsing the jwt token from the header "Authorization"
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = Util.ValidateToken(token, _secret);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                // we can the access this context object in our controller classes
                context.Items["UserId"] = userService.GetById(userId).Id;
            }

            await _next(context);
        }
    }
}
```
Add the `GetById()` method in the service class.

*Services/BlogService.cs*
```csharp
  public User GetById(string id)
  {
      return _userCollection.Find(x => x.Id == id).FirstOrDefault();
  }
```


Now, let's add the ValidateToken() method in our Util class:

*Helpers/Util.cs*

```csharp
		 /* 
         * This method is used to validate the token and then decode the userId stored in the token
         */
        public static string ValidateToken(string token, string secret)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

                // return user id from JWT token if validation successful
                return userId;
            }
            catch
            {
                // return null if validation fails
                return null;
            }
        }
```


Next in our `Startup.cs` file, we need to add our custom middleware in the `Configure()` method and add the authentication service in the `ConfigureServices()` method:

*Startup.cs*
```csharp
public void ConfigureServices(IServiceCollection services)
{
			// Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
              {
                  options.SaveToken = true;
                  options.RequireHttpsMetadata = false;
                  options.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateIssuer = false,
                      ValidateIssuerSigningKey = true,
                      ValidateAudience = false,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"])),
                      ClockSkew = TimeSpan.Zero,
                      ValidateLifetime = true
                  };
              });
}

public  void  Configure(IApplicationBuilder  app, IWebHostEnvironment  env)
{
			//...
			// order is a must here.
			app.UseRouting();
		    app.UseAuthentication();
            app.UseAuthorization();
            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();
}
```

Now, after every request, the server is going to parse the JWT token and attach the user ID into the HTTPContext instance. To inject HTTPContext so that we can access it in all of our controller classes, we have to add it to the `Startup.cs` file in the `ConfigureServices()` method.

*Startup.cs*

```csharp
 services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
```

### Creating Authenticated Endpoints

Now that we can create private endpoints, let's start by adding the API to create a post.

Create a new Controlled called `PostController.cs`

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Service;

namespace project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly string _userId;

        public PostController(IBlogService _blogService)
        {
            this._blogService = _blogService;
            // this is used to parse the userid from the httpContext instance
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];

        }
         // GET /[post]/posts
        [HttpGet]
        [Route("posts")]
        public ActionResult GetPosts()
        {
            List<Post> posts = _blogService.GetPosts();
            if (posts == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Invalid inputs", 400, "Something is wrong"));
            }
            return Ok(posts);
        }

        // POST /[post]/auth
        [Authorize]
        [HttpPost]
        [Route("auth")]
        async public Task<ActionResult> Create([FromForm] Post post)
        {
            post.AuthorId = _userId;
            Payload res = await _blogService.CreatePost(post);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, res.StatusDescription));
            }
            return Ok(res);
        }   
    }
}
```

Now, let's add the 2 methods in BlogService.cs that we called in the above snippet. 
We are getting the user input values as `multipart/formdata` , since we are sending the image file as well.
Now when creating the Post, we are going to upload the file in `UploadCare` and the url that we recevied will be saved in the database.

To upload a file to UploadCare, we need to send a [signature](https://uploadcare.com/docs/security/secure-uploads/#make-signature) in the request header. The signature contains a secret key and an expiration time and shoudl be encoded in HMAC/SHA256. 

In our Util method, we are adding the methods to generate this signature for us.

References: 

 - [Uploadcare REST API](https://uploadcare.com/api-refs/upload-api/#tag/Upload)
 - [Uploadcare docs](https://uploadcare.com/docs/uploads/)
 
First, we add the Uploadare credentials in `appsettings.json`

*appsettings.json*
```js
 "UploadCare": {
    "PubKey": "<add your public folder key found in your uploadcare profile>",
    "Secret": "<add your secret key found in your uploadcare profile>",
    "Expiry": "1"
  }
```


*Services/BlogService.cs*

```csharp
   public class BlogService : IBlogService
   {
	    private readonly IMongoCollection<Post> _postCollection;
	    private readonly string _uploadCareSecret;
	    private readonly string _uploadCarePubKey;
	    private readonly int _uploadCareExpiry;
	    
	    public BlogService(IConfiguration config)
        {
             //...
            _postCollection = db.GetCollection<Post>("Posts");
            // upload care keys
            _uploadCarePubKey = config["UploadCare:PubKey"];
            _uploadCareSecret = config["UploadCare:Secret"];
            _uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
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
   }
```

*Helpers/Util.cs*

```csharp
	    public static KeyValuePair<string, string> GenerateSignature(string secret, int expiry)
        {
            TimeSpan expiryTime = TimeSpan.FromMinutes(expiry);
            var expire = (DateTimeOffset.UtcNow.ToUnixTimeSeconds() + expiryTime.TotalSeconds).ToString(CultureInfo.InvariantCulture);
            var signature = StringToMD5(secret + expire);

            return new KeyValuePair<string, string>(expire, signature);

        }

        // implicit call from ValidateToken()
        private static string StringToMD5(string s)
        {
            using (var md5 = MD5.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(s);
                var hashBytes = md5.ComputeHash(bytes);
                return HexStringFromBytes(hashBytes);
            }
        }

        // implict call from StringToMD5
        private static string HexStringFromBytes(byte[] bytes)
        {
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }

```

Finally, we add the front end code to send a POST request with the Post contents:
```js
	  var formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("coverPhoto", file);

      // sending the header with the bearer token
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

      const { data } = await axios.post(
        `https://localhost:5001/post/auth/posts`,
        formData,
        config 
      );
```
That's it for the workshop. You can find the completed project [here](https://github.com/Propo41/msa-workshop/tree/main/03_completed_project)
