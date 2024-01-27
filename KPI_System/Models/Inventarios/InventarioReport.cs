using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Inventarios
{
    public class InventarioReport
    {
        public string Division { get; set; }
        public string BasNom { get; set; }
        public string Almacen { get; set; }
        public string Partida { get; set; }
        public string Descripcion{get; set;}
        public string Unidad {get; set;}
        public decimal? Precio{get; set;}
        public int? Existencia  { get; set;}
        public decimal? Costo {get; set;}

    }
}