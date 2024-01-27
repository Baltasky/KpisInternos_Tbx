using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Fallas
{
    public class Failure
    {
        public string Division { get; set; }
        public string Zona { get; set; }
        public string Ubicacion { get; set; }
        public string Equipo { get; set; }
        public string TipoServicio { get; set; }
        public string Contenedor { get; set; }
        public int Danadas { get; set; }
        public int Perdidas { get; set; }

    }
}