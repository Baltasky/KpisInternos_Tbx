using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class Solicitud
    {
        public string Zona { get; set; }
        public string Equipo { get; set; }
        public decimal Solicitudes { get; set; }
        public int Partidas { get; set; }
        public int Porcentaje { get; set; }
        public string Mes { get; set; }

    }
}