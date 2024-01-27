using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class VentasRentasTablasViewModel
    {
        public List<Solicitud> Solicitud { get; set; } = new List<Solicitud>();
        public List<ClasificacionHerramientaSolicitud> HerramientaSolicitud { get; set; } = new List<ClasificacionHerramientaSolicitud>();
        public List<ClasificacionHerraPdaXCont> HerraPdaXCont { get; set; } = new List<ClasificacionHerraPdaXCont>();
    }
}