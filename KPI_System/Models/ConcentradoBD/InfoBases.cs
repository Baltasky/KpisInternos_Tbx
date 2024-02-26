using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ConcentradoBD
{
    public class InfoBases
    {
        [Key]
        public int Id {get; set;}
        public int IdZONA  {get; set;}
        public string Zona { get; set;}
        public int IdUOP  {get; set;}
        public string UOP  {get; set;}
        public string Tipo  {get; set;}
        public string Contenedor { get; set; }
        public string Base { get; set; }
    }
}