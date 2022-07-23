namespace CleanStreetsApi.Models;

public class CleanStreetsDatabaseSettings{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string MapsCollectionName { get; set; } = null!;
}