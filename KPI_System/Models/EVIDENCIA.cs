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
    
    public partial class EVIDENCIA
    {
        public int EviCod { get; set; }
        public short EviConCod { get; set; }
        public short EviAlmCod { get; set; }
        public System.DateTime EviFch { get; set; }
        public string EviFol { get; set; }
        public short EviEstCod { get; set; }
        public Nullable<int> PedCod { get; set; }
        public int EviAutEmpCod { get; set; }
        public short EviAutEmpComCod { get; set; }
        public int EviTbx1EmpCod { get; set; }
        public short EviTbx1EmpComCod { get; set; }
        public int EviTbx2EmpCod { get; set; }
        public short EviTbx2EmpComCod { get; set; }
        public string EviTur { get; set; }
        public Nullable<short> EviUsuCodCre { get; set; }
        public System.DateTime EviFchCre { get; set; }
        public Nullable<short> EviUsuCodMod { get; set; }
        public Nullable<System.DateTime> EviFchMod { get; set; }
        public byte[] EviArc { get; set; }
        public string EviArcTip { get; set; }
        public string EviArcNom { get; set; }
        public Nullable<short> EviEst { get; set; }
        public Nullable<int> EstiCod { get; set; }
        public string EviNoFacEst { get; set; }
    
        public virtual ALMACENE ALMACENE { get; set; }
        public virtual CONTRATO CONTRATO { get; set; }
        public virtual ESTATU ESTATU { get; set; }
        public virtual USUARIO USUARIO { get; set; }
    }
}