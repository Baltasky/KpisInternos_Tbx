using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;

namespace KPI_System.Models.Fallas
{
    public class ReporteFallas
    {
        public int Id { get; set; }
        public string DIVISION { get; set; }
        public string UOP { get; set; }
        public string LOCALIZACION { get; set; }
        public string EQUIPO  {get;set;}
        public string FECHA {get;set;}
        public string HORA    {get;set;}
        public int MOVCON {get;set;}
        public Int16? MOVTIPDOC   {get;set;}
        public string ESTATUS {get;set;}
        public string FOLIO   {get;set;}
        public string FOLIODEV {get;set;}
        public decimal CANTIDAD    {get;set;}
        public decimal PARTIDA {get;set;}
        public string DESCRIPCION {get;set;}
        public string PERSONALPMX {get;set;}
        public string PUESTO  {get;set;}
        public string AUTORIZA {get;set;}
        public string PUESTOAUT   {get;set;}
        public string TECNICO {get;set;}
        public string FICHA{get;set;}

    }
}