using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Models.Cumplimiento
{
    public class Cumplimientos
    {
        public int Id { get; set; }
        public int mes { get; set; }
        public int Programadas { get; set; }
        public int Mantto { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal Cumplimiento { get; set; }
    }
}