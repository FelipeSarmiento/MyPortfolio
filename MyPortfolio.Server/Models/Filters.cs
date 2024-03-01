using System.Collections;
using System.Runtime.CompilerServices;

namespace MyPortfolio.Server
{
    public class Filters
    {
        public int id { get; set; }

        public string name { get; set; }

        public IEnumerable options { get; set; }
    }
}
