using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Fallas
{
    public class FallasViewModel
    {
        public List<Failure> Fallas { get; set; } = new List<Failure>();
        public List<ReporteFallas> ReporteFallas { get; set; } = new List<ReporteFallas>();
        public List<Select2> Divisiones { get; set; } = new List<Select2>();
        public List<Select2> Equipos { get; set; } = new List<Select2>();
        public List<Select2> EmpleadosPMX { get; set; } = new List<Select2>();

        public string ReportePerido { get; set; }



    }
}