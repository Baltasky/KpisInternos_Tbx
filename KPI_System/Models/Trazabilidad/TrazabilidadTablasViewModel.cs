using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Trazabilidad
{
    public class TrazabilidadTablasViewModel
    {
        public List<PartidasUtilizadas> PartidasUtilizadas { get; set; } = new List<PartidasUtilizadas>();
        public List<HerramientasXclasificacion> HerramientasXclasificacion { get; set; } = new List<HerramientasXclasificacion>();
        public List<PorcentajeUtilizacion> PorcentajeUtilizacion { get; set; } = new List<PorcentajeUtilizacion>();
    }
}