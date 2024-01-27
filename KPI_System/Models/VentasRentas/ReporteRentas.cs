using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls.WebParts;

namespace KPI_System.Models.VentasRentas
{
    public class ReporteRentas
    {
        public string ZONA { get; set;}
        public string UOP { get; set;}
        public string POZO {get; set;}
        public string Equipo  {get; set;}
        public string Folio {get; set;}
        public string Fecha   {get; set;}
        public string Partida { get; set;}
        public string Descripcion {get; set;}
        public string Medida {get; set;}
        public decimal? Cant { get; set; }
        public decimal? Monto { get; set; }
        public decimal? Importe { get; set; }
        public decimal? Estimacion { get; set; }
        public string Moneda {get; set;}
        public string Unidad { get; set; }


    }
}