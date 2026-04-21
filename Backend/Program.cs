using System.Text.Json;
using System.IO;

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

app.MapGet("/fullList", () =>
{
    string newList = combineFilesIntoOne();
    List<Weapon> returnList = JsonSerializer.Deserialize<List<Weapon>>("[" + newList + "]");
    return returnList;
});

app.MapGet("/random", () =>
{
    string newList = combineFilesIntoOne();
    List<Weapon> returnList = JsonSerializer.Deserialize<List<Weapon>>("[" + newList + "]");
    return generateRandom(returnList, true);
}
);

app.MapGet("/randomKitless", () =>
{
    string newList = combineFilesIntoOne();
    List<Weapon> returnList = JsonSerializer.Deserialize<List<Weapon>>("[" + newList + "]");
    return generateRandom(returnList, false);
}
);

app.MapPost("/customList", (Weapon[] weapons) =>
{
    Console.Write(weapons);
});

app.MapPost("/name", (string name) =>
{
    Directory.CreateDirectory($"users/{name}");
});

app.Run();

string parseInputFile(string input)
{
    string newList = input.Substring(1);
    newList = newList.Remove(newList.Length - 1);
    return newList;
};

string combineFilesIntoOne()
{
    string newList = parseInputFile(File.ReadAllText("weapons/Blaster.json"));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Brella.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Brush.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Charger.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Dualie.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Roller.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Shooter.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Slosher.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Splatana.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Splatling.json")));
    newList = String.Concat(newList, ",", parseInputFile(File.ReadAllText("weapons/Stringer.json")));
    return newList;
}

Weapon generateRandom(List<Weapon> inputList, bool doKit)
{
    Random random = new Random();
    int randomOutput = random.Next(0, inputList.Count());
    if (doKit == false && inputList.ElementAt(randomOutput).reKit == "True")
    {
        Weapon tryAgain = generateRandom(inputList, doKit);
        return tryAgain;
    }
    else
    {
        return inputList.ElementAt(randomOutput);
    }

}
public record Weapon(string Name, string reKit, string Sub, string Special,string Class);
