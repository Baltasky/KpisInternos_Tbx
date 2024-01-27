using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ReporteEjecutivoRentas
{
    public class ReporteEjecutivoRentasList
    {
        public int? IdZONA { get; set; }
        public string ZONA { get; set; }
        public int? IdUOP { get; set; }
        public string UOP { get; set; }
        public string EQUIPO { get; set; }
        public string Equipos { get; set; }
        public decimal? ENERO{ get; set; }
        public decimal? FEBRERO { get; set; }
        public decimal? MARZO { get; set; }
        public decimal? ABRIL { get; set; }
        public decimal? MAYO { get; set; }
        public decimal? JUNIO { get; set; }
        public decimal? JULIO { get; set; }
        public decimal? AGOSTO { get; set; }
        public decimal? SEPTIEMBRE { get; set; }
        public decimal? OCTUBRE { get; set; }
        public decimal? NOVIEMBRE { get; set; }
        public decimal? DICIEMBRE { get; set; }
        public decimal? IMPORTE { get; set; }
    }
}