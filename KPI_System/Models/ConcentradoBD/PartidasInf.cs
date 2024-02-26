using DocumentFormat.OpenXml.Drawing.Charts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Policy;
using System.Web;

namespace KPI_System.Models.ConcentradoBD
{
    public class PartidasInf
    {
        [Key]
        public int? Id {get;set;}
        public string Almacen {get;set;}
        public int Partida {get;set;}
        public int? Existencia {get;set;}

    }
}