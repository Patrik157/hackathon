using CleanStreetsApi.Models;
using CleanStreetsApi.Services;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.Configure<CleanStreetsDatabaseSettings>(
    builder.Configuration.GetSection("CleanStreetsDatabase"));
builder.Services.AddSingleton<UsersService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
