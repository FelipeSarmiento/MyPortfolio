namespace MyPortfolio.Server.Data;

public class Connection
{
    private string SQLString = string.Empty;

    public Connection()
    {
        var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();

        SQLString = builder.GetSection("ConnectionStrings:SQLConnection").Value;
    }

    public string getSQLString()
    {
        return SQLString;
    }

}