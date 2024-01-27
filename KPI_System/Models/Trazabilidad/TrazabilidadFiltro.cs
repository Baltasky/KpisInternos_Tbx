using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Trazabilidad
{
    public class TrazabilidadFiltro
    {
        public string Division { get; set; }
        public string Zona { get; set; }
        public string Ubicacion { get; set; }
        public string Equipo { get; set; }
        public string TipoServicio { get; set; }
        public string Contenedor { get; set; }
        public decimal PartidasTotales { get; set; }
        public int PartidasUtilizadas { get; set; }
        public decimal HorasPrestamo { get; set; }
        public decimal CantidadSurtimiento { get; set; }
    }
}