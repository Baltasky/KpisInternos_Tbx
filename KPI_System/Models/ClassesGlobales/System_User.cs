using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ClassesGlobales
{
    public class System_User
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Menus { get; set; }
        public string MainRute { get; set; }
    }
}