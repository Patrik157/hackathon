using CleanStreetsApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CleanStreetsApi.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly string key, salt;
    const int hoursDuration = 1;    //Number of Hours that the key lasts

    public UsersService(
        IOptions<CleanStreetsDatabaseSettings> CleanStreetsDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            CleanStreetsDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            CleanStreetsDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<User>(
            CleanStreetsDatabaseSettings.Value.UsersCollectionName);
    
        key = CleanStreetsDatabaseSettings.Value.JwtKey;

        salt = CleanStreetsDatabaseSettings.Value.Salt;
    }

    public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newUser) =>
        await _usersCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _usersCollection.DeleteOneAsync(x => x.Id == id);

    private string PasswordHashing(string password){
        password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: Encoding.ASCII.GetBytes(salt),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        return password;
    }

    public async Task<(string, User)> Authenticate(string email, string password){
        User user;
        password = PasswordHashing(password);
        
        try{
            user = await _usersCollection.Find(x => x.email == email && x.password == password).FirstAsync();  
        } catch{
            return (null!, null!);
        }
        
        return (GenerateJWTToken(email), user);
    }
    private string GenerateJWTToken(string email){
        JwtSecurityTokenHandler tokenHolder = new JwtSecurityTokenHandler();
        byte[] tokenKey = Encoding.ASCII.GetBytes(key);
        
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor(){
            Subject = new ClaimsIdentity(new Claim[]{
                new Claim(ClaimTypes.Email, email),
            }),
            Expires = DateTime.UtcNow.AddHours(hoursDuration),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        SecurityToken token = tokenHolder.CreateToken(tokenDescriptor);
        return tokenHolder.WriteToken(token);
    }

    
    public async Task<int> Register(User newUser){  //0= success, 1 = emailtaken, 2 = username taken  3= password too short 4= username is too short

        if(newUser.username.Length < 3)
            return 4;
        else if(newUser.password.Length < 8)
            return 3;
        else if(await _usersCollection.Find(x => x.email == newUser.email).AnyAsync())
            return 1;
        else if(await _usersCollection.Find(x => x.username == newUser.username).AnyAsync())
            return 2;

        newUser.password = PasswordHashing(newUser.password);

        await _usersCollection.InsertOneAsync(newUser);
            return 0;
    }
    public async Task<int> Confirm(Guid GUID){
        System.Console.WriteLine(GUID);
        var configured = await _usersCollection.Find(x => x.GUID == GUID).AnyAsync();
        if(configured){
            var user = await _usersCollection.Find(x => x.GUID == GUID).FirstAsync();
            user.confirmed = true;
            return 1;
        }
        return 0; 
    }
}