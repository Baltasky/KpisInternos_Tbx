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
    
    public partial class AFECTACIONE
    {
        public short AfeConCod { get; set; }
        public int AfePedCod { get; set; }
        public System.DateTime AfeFch { get; set; }
        public Nullable<short> AfeIncCod { get; set; }
        public string AfeObs { get; set; }
        public Nullable<short> AfeUsuCod { get; set; }
        public Nullable<System.DateTime> AfeUsuFchCre { get; set; }
        public Nullable<short> AfeUsuMod { get; set; }
        public Nullable<System.DateTime> AfeUsuFchMod { get; set; }
        public Nullable<short> AcoCod { get; set; }
        public short AfeEstCod { get; set; }
        public Nullable<short> AfeProg { get; set; }
    }
}