using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class VentasRentas
    {
        
        public string TipoProducto { get; set; }
        public string Division { get; set; }
        public string Zona { get; set; }
        public string Ubicacion { get; set; }
        public string Equipo { get; set; }
        public string TipoServicio { get; set; }
        public string Contenedor { get; set; }
        public decimal VentaConsumibles { get; set; }
        public decimal RentaContenedor { get; set; }
        public decimal TotalGenerado { get; set; }
    }
}