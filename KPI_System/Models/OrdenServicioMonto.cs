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
    
    public partial class OrdenServicioMonto
    {
        public string OrdSerFol { get; set; }
        public short ClaVtaCod { get; set; }
        public decimal OrdSerMMon { get; set; }
    
        public virtual CLASIVTA CLASIVTA { get; set; }
    }
}