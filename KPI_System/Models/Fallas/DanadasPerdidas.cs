using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Fallas
{
    public class DanadasPerdidas
    {
        public decimal Partida { get; set; }
        public string DescripcionPartida { get; set; }
        public string FamiliaHerramienta { get; set; }
        public string UnidadMedida { get; set; }
        public string Condicion { get; set; }
        public string PersonaPemex { get; set; }
        public string PuestoPemex { get; set; }
        public string NombreAutorizaPemex { get; set; }
        public string PuestoAutorizaPemex { get; set; }
        public string Fecha { get; set; }

    }
}