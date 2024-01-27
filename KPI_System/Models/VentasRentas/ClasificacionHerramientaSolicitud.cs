using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class ClasificacionHerramientaSolicitud
    {
        public string Zona { get; set; }
        public string Equipo { get; set; }
        public int IdClasificacion { get; set; }
        public string Clasificacion { get; set; }
        public int Salida { get; set; }
        public string Mes { get; set; }

    }
}