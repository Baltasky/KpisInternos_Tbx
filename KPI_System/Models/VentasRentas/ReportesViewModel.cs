using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class ReportesViewModel
    {
        public List<ReporteVentas> ReporteVentas { get; set; } = new List<ReporteVentas>();
        public List<ReporteRentas> ReporteRentas { get; set; } = new List<ReporteRentas>();


        public string ReportePerido { get; set; }
        public List<Select2> Divisiones { get; set; } = new List<Select2>();
        public List<Select2> Equipos { get; set; } = new List<Select2>();
        public List<Select2> AlmacenesRentas { get; set; } = new List<Select2>();
    }
}