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
    
    public partial class LogersDetalle
    {
        public int LogeCod { get; set; }
        public System.DateTime LogDHor { get; set; }
        public string LogDMov { get; set; }
        public string LogDApl { get; set; }
        public string LogDTip { get; set; }
        public Nullable<short> LogDAlmCod { get; set; }
    
        public virtual ALMACENE ALMACENE { get; set; }
        public virtual Loger Loger { get; set; }
    }
}
