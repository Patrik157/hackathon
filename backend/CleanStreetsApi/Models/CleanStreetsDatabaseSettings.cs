namespace CleanStreetsApi.Models;

public class CleanStreetsDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string UsersCollectionName { get; set; } = null!;

    public string JwtKey {get; set; } = string.Empty;

    public string Salt {get; set; } = string.Empty;
}