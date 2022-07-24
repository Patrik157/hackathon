using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CleanStreetsApi.Models;


public class mapCords
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public double lon { get; set; } = 0;

    public double lat {get; set; } = 0;
}
