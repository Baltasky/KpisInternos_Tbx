using KPI_System.Models.Globales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ReporteGeneral
{
    public class ReporteGeneralViewModel
    {
        public string ReportePerido { get; set; }
        public List<Select2> Divisiones { get; set; } = new List<Select2>();
        public List<ReporteGeneralList> ReporteGeneralList { get; set; } = new List<ReporteGeneralList>();
    }
}