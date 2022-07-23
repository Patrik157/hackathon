using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CleanStreetsApi.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string email {get; set; } = null!;

    
    public Guid GUID {get; set; } = Guid.NewGuid();

    public int role {get; set;} = 0;

    public bool confirmed { get; set; } = false;
}