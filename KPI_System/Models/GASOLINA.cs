//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KPI_System.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class GASOLINA
    {
        public int GasCod { get; set; }
        public int GasEmpCod { get; set; }
        public System.DateTime GasFch { get; set; }
        public int ActCod { get; set; }
        public int GasKmAct { get; set; }
        public int GasKmAnt { get; set; }
        public decimal GasPreLt { get; set; }
        public decimal GasLts { get; set; }
        public short GasEmpComCod { get; set; }
        public short ActConCod { get; set; }
        public byte[] GasArc { get; set; }
        public string GasArcNom { get; set; }
        public string GasArcTip { get; set; }
        public short ActFamCod { get; set; }
    }
}