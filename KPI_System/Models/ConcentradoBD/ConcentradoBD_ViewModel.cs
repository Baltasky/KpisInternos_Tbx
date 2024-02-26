using KPI_System.Models.ClassesGlobales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ConcentradoBD
{
    public class ConcentradoBD_ViewModel
    {
        public List<CombosModel>  Paquete { get; set; } = new List<CombosModel>();
        public List<PartidasInf>  PartidasInf { get; set; } = new List<PartidasInf>();
        public List<InfoBases> InfoBases { get; set; } = new List<InfoBases>();
        public List<PartidasDescripcion> PartidasDescripcion { get; set; } = new List<PartidasDescripcion>();
        public string Tipo { get; set; }
    }
}