using CleanStreetsApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CleanStreetsApi.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _UsersCollection;

    public UsersService(
        IOptions<CleanStreetsDatabaseSettings> CleanStreetsDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            CleanStreetsDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            CleanStreetsDatabaseSettings.Value.DatabaseName);

        _UsersCollection = mongoDatabase.GetCollection<User>(
            CleanStreetsDatabaseSettings.Value.UsersCollectionName);
    }

    public async Task<List<User>> GetAsync() =>
        await _UsersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _UsersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newUser) =>
        await _UsersCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _UsersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _UsersCollection.DeleteOneAsync(x => x.Id == id);
}