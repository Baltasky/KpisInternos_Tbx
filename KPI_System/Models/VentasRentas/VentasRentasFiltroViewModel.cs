using KPI_System.Models.ClassesGlobales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.VentasRentas
{
    public class VentasRentasFiltroViewModel
    {
        public List<VentasRentas> Actual { get; set; } = new List<VentasRentas>();
        public List<VentasRentas> Anterior { get; set; } = new List<VentasRentas>();
        public List<CombosModel> AlmacenesVentas { get; set; } = new List<CombosModel>();
        public List<CombosModel> AlmacenesRentas { get; set; } = new List<CombosModel>();
    }
}