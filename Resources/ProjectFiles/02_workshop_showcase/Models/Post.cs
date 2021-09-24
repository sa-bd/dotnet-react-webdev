using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace project.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string AuthorId { get; set; }
        public string Author { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Must be between 5 and 50 characters", MinimumLength = 5)]
        public string Title { get; set; }

        [Required]
        [StringLength(5000, ErrorMessage = "Must be between greater than 5 characters", MinimumLength = 5)]
        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        [BsonIgnoreIfNull]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // [Required]
        public IFormFile CoverPhoto { get; set; }

        public string CoverPhotoPreview { get; set; }
    }
}