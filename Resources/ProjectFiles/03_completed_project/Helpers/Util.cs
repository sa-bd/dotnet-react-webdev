using System.Text;
using System.IdentityModel.Tokens.Jwt;
using project.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Globalization;

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


    }
}