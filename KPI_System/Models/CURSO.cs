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
    
    public partial class CURSO
    {
        public int CurCod { get; set; }
        public short CurConCod { get; set; }
        public string CurCve { get; set; }
        public string CurNom { get; set; }
        public short CurTip { get; set; }
        public string CurObj { get; set; }
        public short CurAut { get; set; }
        public short CurUsuCodCre { get; set; }
        public System.DateTime CurFchCre { get; set; }
        public Nullable<short> CurUsuCodMod { get; set; }
        public Nullable<System.DateTime> CurFchMod { get; set; }
        public System.Guid msrepl_tran_version { get; set; }
    }
}
