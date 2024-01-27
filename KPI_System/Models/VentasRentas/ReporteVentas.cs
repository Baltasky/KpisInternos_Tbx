using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace KPI_System.Models.VentasRentas
{
    public class ReporteVentas
    {
        public string UOP { get; set; }
        public string Division { get; set; }
        public string Localizacion { get; set; }
        public string Equipo { get; set; }
        public string Fecha { get; set; }
        public string Folio { get; set; }
        public decimal? Cantidad { get; set; }
        public decimal? Precio {get;set;}
        public decimal? Importe {get;set;}
        public string Moneda  {get;set;}
        public string Partida {get;set;}
        public string Descripcion {get;set;}
        public string PersonalPmX {get;set;}
        public string Puesto {get;set;}
        public string Autoriza {get;set;}
        public string PuestoAut   {get;set;}
        public string Tecnico{get;set;}
    }
}