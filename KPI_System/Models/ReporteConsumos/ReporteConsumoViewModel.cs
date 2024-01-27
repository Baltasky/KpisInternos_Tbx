using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ReporteConsumos
{
    public class ReporteConsumoViewModel
    {
        public List<ReporteConsumoList> PorZona { get; set; } = new List<ReporteConsumoList>();
        public List<ReporteConsumoList> PorUnidadOperativa { get; set; } = new List<ReporteConsumoList>();
        public List<ReporteConsumoList> PorEquipo { get; set; } = new List<ReporteConsumoList>();
        public List<ReporteConsumoList> Totales { get; set; } = new List<ReporteConsumoList>();
    }
}