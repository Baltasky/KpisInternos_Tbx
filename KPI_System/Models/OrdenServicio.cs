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
    
    public partial class OrdenServicio
    {
        public string OrdSerFol { get; set; }
        public System.DateTime OrdSerFch { get; set; }
        public int OrdSerLocCodUO { get; set; }
        public short GerCod { get; set; }
        public int OrdSerLocCod { get; set; }
        public string OrdSerEqu { get; set; }
        public string OrdSerProPre { get; set; }
        public string OrdSerElePep { get; set; }
        public string OrdSerCenGes { get; set; }
        public string OrdSerCtaMay { get; set; }
        public System.DateTime OrdSerFchCre { get; set; }
        public short OrdSerUsuCod { get; set; }
        public Nullable<System.DateTime> OrdSerFchMod { get; set; }
        public Nullable<short> OrdSerUsuCodMod { get; set; }
        public string OrdSerNot { get; set; }
        public byte[] OrdSerArc { get; set; }
        public string OrdSerArcTip { get; set; }
        public string OrdSerArcNom { get; set; }
        public string OrdSerPedVta { get; set; }
        public Nullable<short> OrdSerLin { get; set; }
        public string OrdSerEstOch { get; set; }
    
        public virtual GERENCIA GERENCIA { get; set; }
        public virtual LOCALIZACIONE LOCALIZACIONE { get; set; }
        public virtual LOCALIZACIONE LOCALIZACIONE1 { get; set; }
        public virtual OrdenServicio OrdenServicio1 { get; set; }
        public virtual OrdenServicio OrdenServicio2 { get; set; }
        public virtual USUARIO USUARIO { get; set; }
        public virtual USUARIO USUARIO1 { get; set; }
    }
}