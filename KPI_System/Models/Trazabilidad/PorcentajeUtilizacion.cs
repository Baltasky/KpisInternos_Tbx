using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Trazabilidad
{
    public class PorcentajeUtilizacion
    {
        public string Zona { get; set; }
        public string Mes { get; set; }
        public Int16 Equipo { get; set; }
        public decimal Solicitudes { get; set; }
        public int Partidas { get; set; }
        public int Porcentaje { get; set; }
    }
}