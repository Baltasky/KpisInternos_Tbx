using KPI_System.Models.ReporteConsumos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ReporteEjecutivoRentas
{
    public class ReporteEjecutivoRentasViewModel
    {
        public List<ReporteEjecutivoRentasList> BdPorZona { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> BdPorUnidadOperativa { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> BdPorEquipo { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> BdTotales { get; set; } = new List<ReporteEjecutivoRentasList>();

        public List<ReporteEjecutivoRentasList> HidrosPorZona { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HidrosPorUnidadOperativa { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HidrosPorEquipo { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HidrosTotales { get; set; } = new List<ReporteEjecutivoRentasList>();

        public List<ReporteEjecutivoRentasList> HttsEspecialesPorZona { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HttsEspecialesPorUnidadOperativa { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HttsEspecialesPorEquipo { get; set; } = new List<ReporteEjecutivoRentasList>();
        public List<ReporteEjecutivoRentasList> HttsEspecialesTotales { get; set; } = new List<ReporteEjecutivoRentasList>();

    }
}