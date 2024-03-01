using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Server.Data;
using Newtonsoft.Json;

namespace MyPortfolio.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsDashboardController : ControllerBase
    {
        ItemDashboardData itemDashboardData = new ItemDashboardData();

        private readonly ILogger<ItemsDashboardController> _logger;

        public ItemsDashboardController(ILogger<ItemsDashboardController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetItemsDashboard")]
        public Root Get()
        {
            // return root;
            return new Root()
            {
                Sections = itemDashboardData.GetSection(),
                Order = itemDashboardData.GetOrderSections()
            };
        }

        [HttpPost(Name = "PostItemsDashboard")]
        public string Post([FromBody] string item)
        {
            Root root = JsonConvert.DeserializeObject<Root>(item);
            itemDashboardData.EditItemsDashboard(root);
            return "Success:  " + item;
        }
        [HttpPut(Name = "PutItemsDashboard")]
        public string Put([FromBody] string item)
        {
            Root root = JsonConvert.DeserializeObject<Root>(item);
            itemDashboardData.EditItemsDashboard(root);
            return "Success:  " + item;
        }
    }
}