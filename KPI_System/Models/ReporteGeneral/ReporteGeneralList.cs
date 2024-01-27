using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ReporteGeneral
{
    public class ReporteGeneralList
    {
        public int? No { get; set; }
        public string ZONA { get; set; }
        public string UOP { get; set; }
        public int? EQUIPO { get; set; }
        public string Tipo { get; set; }
        public string POZO { get; set; }
        public int? DiasGenerados { get; set; }
        public string MontoRenta { get; set; }
        public string TIPOCONTENEDOR { get; set; }
        public string MontoRentaContenedor { get; set; }
        public string CONTENEDOR { get; set; }
        public int? Partidas { get; set; }
        public int? RENTADO { get; set; }
        public int? PartidadRentadas { get; set; }
        public string PorcentajeContractual { get; set; }
        public string VENDIDO { get; set; }
        public int? PartidasVendidas { get; set; }
        public string MontoVentas { get; set; }
        public int? PartidasDanadas { get; set; }
        public int? PartidasPerdidas { get; set; }
        public int? ExistenciaRealHerramientas { get; set; }
        public string PorcentajeInvReal { get; set; }
        public string PorcentajeRealInvFisico { get; set; }
        public string ColorPorcentContractual { get; set; }
        public string ColorPorcentInvFisico { get; set; }

    }

}