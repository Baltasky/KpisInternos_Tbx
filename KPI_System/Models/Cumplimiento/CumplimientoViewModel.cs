using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Cumplimiento
{
    public class CumplimientoViewModel
    {
        public List<Cumplimientos> Mantenimiento { get; set; } = new List<Cumplimientos>();
        public List<Cumplimientos> Calibracion { get; set; } = new List<Cumplimientos>();
        public List<Cumplimientos> Capacitacion { get; set; } = new List<Cumplimientos>();
        public List<Cumplimientos> Certificacion { get; set; } = new List<Cumplimientos>();
        public string Fecha { get; set; } = "";
    }
}