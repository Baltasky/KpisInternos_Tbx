using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KPI_System.Models.ConcentradoBD
{
    public class PartidasDescripcion
    {
        [Key]
        public int? Id { get; set; }
        public int Partida { get; set; }
        public string SMI { get; set; }
        public string Descripcion { get; set; }
        public string CostoBC { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string TipoMedida { get; set; }
        public string Tipo { get; set; }
        public int Cantidad { get; set; }
    }
}