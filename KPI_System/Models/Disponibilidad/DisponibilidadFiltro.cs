using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Disponibilidad
{
    public class DisponibilidadFiltro
    {
        public string Division { get; set; }
        public string Zona { get; set; }
        public string Ubicacion { get; set; }
        public string Equipo { get; set; }
        public string TipoServicio { get; set; }
        public string Contenedor { get; set; }
        public int Existenciaconsumibles { get; set; }
        public int ExistenciaRealHerramientas { get; set; }
        public decimal? TotalHttasDisponibles { get; set; }
    }
}