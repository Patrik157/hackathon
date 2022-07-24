using CleanStreetsApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Net;
using System.Net.Mail;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CleanStreetsApi.Services;

public class cordsService{

    private readonly IMongoCollection<mapCords> _cordsCollection;
    public cordsService(
        IOptions<CleanStreetsDatabaseSettings> CleanStreetsDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            CleanStreetsDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            CleanStreetsDatabaseSettings.Value.DatabaseName);

        _cordsCollection = mongoDatabase.GetCollection<mapCords>(
            CleanStreetsDatabaseSettings.Value.CoordsCollectionName);
    }

    public async Task<List<mapCords>> GetcordsAsync() => 
        await _cordsCollection.Find(_ => true).ToListAsync();
    public async Task<mapCords?> GetcordsAsync(string id) =>
        await _cordsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreatecordsAsync(mapCords newmapCords) =>
        await _cordsCollection.InsertOneAsync(newmapCords);

    public async Task UpdatecordsAsync(string id, mapCords updatedmapCords) =>
        await _cordsCollection.ReplaceOneAsync(x => x.Id == id, updatedmapCords);

    public async Task RemovecordsAsync(string id) =>
        await _cordsCollection.DeleteOneAsync(x => x.Id == id);


}