using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Trazabilidad
{
    public class TrazabilidadFiltrosViewModel
    {
        public List<TrazabilidadFiltro> Actual { get; set; } = new List<TrazabilidadFiltro>();
        public List<TrazabilidadFiltro> Anterior { get; set; } = new List<TrazabilidadFiltro>();
    }
}