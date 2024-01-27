using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Inventarios
{
    public class InventariosViewModel
    {
        public List<Select2> Divisiones { get; set; } = new List<Select2>();
        public List<InventarioReport> InventarioReport { get; set; } = new List<InventarioReport>();



        public int Almacen { get; set; }
        public int TipoPartida { get; set; }

    }
}