using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o =>
    o.AddDefaultPolicy(p =>
        p.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
    )
);
var app = builder.Build();
app.UseCors();

app.MapGet("/", () => "Hello World!");

app.MapGet("/fullList", () => {
    var weaponList = File.ReadAllText("weapons/Blaster.json");

    List<Weapon> returnList = JsonSerializer.Deserialize<List<Weapon>>(weaponList);
    return returnList;
});

app.Run();

public record Weapon (string Name, string Rekit, string Sub, string Special);
