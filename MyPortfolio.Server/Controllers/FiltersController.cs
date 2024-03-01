using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace MyPortfolio.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FiltersController : ControllerBase
    {
        private static readonly string[] titles = new[]
        {
            "Nav Bar", "Body", "Footer"
        };

        private readonly ILogger<FiltersController> _logger;

        public FiltersController(ILogger<FiltersController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetFilters")]
        public IEnumerable<Filters> Get()
        {
            return Enumerable.Range(1, titles.Length).Select(index => new Filters
            {
                id = index,
                name = titles[index - 1],
                options = Enumerable.Range(1,4).Select(index => new SubMenu
                {
                    value = "Prueba",
                    label = "PruebaLabel",
                    @checked = false
                })
                // Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
