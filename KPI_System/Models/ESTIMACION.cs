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
    
    public partial class ESTIMACION
    {
        public int EstiCod { get; set; }
        public short ConCod { get; set; }
        public int EstiPedCod { get; set; }
        public decimal EstFol { get; set; }
        public short EstiTip { get; set; }
        public Nullable<int> EstiCenGest { get; set; }
        public Nullable<int> EstiCenCost { get; set; }
        public Nullable<int> EstiCenBen { get; set; }
        public Nullable<decimal> EstiRes { get; set; }
        public Nullable<decimal> EstiAvaFis { get; set; }
        public string EstiProp { get; set; }
        public string EstiFon { get; set; }
        public string EstiPosFin { get; set; }
        public Nullable<short> EstiPos { get; set; }
        public Nullable<decimal> EstiAvaFin { get; set; }
        public string EstiEPep { get; set; }
        public string EstiCtaMay { get; set; }
        public Nullable<int> EstiEmpCodRev { get; set; }
        public Nullable<short> EstiEmpComCodRev { get; set; }
        public Nullable<int> EstiEmpCodAut { get; set; }
        public Nullable<short> EstiEmpComCodAut { get; set; }
        public Nullable<int> EstiEmpCodEsti { get; set; }
        public Nullable<short> EstiEmpComCodEsti { get; set; }
        public Nullable<short> EstiPueCodEsti { get; set; }
        public short EstiEstCod { get; set; }
        public System.DateTime EstiFchCre { get; set; }
        public string EstiFolReg { get; set; }
        public Nullable<System.DateTime> EstiFchEst { get; set; }
        public string EstiFacFol { get; set; }
        public Nullable<System.DateTime> EstiFchFac { get; set; }
        public System.DateTime EstiFchIni { get; set; }
        public System.DateTime EstiFchTer { get; set; }
        public string EstiNumOrdSer { get; set; }
        public string EstiPedSAP { get; set; }
        public Nullable<decimal> EstiSolGen { get; set; }
        public string EstiCopNum { get; set; }
        public string EstiRaf { get; set; }
        public string EstFolOch { get; set; }
        public string EstiNotCre { get; set; }
        public Nullable<short> EstiSop { get; set; }
        public Nullable<short> EstiSopEst { get; set; }
        public Nullable<short> EstiVen { get; set; }
        public Nullable<short> EstiHojEnt { get; set; }
        public string OrdSerFol { get; set; }
        public Nullable<short> EstiPueCodRev { get; set; }
        public Nullable<short> EstiPueCodAut { get; set; }
    
        public virtual CONTRATO CONTRATO { get; set; }
    }
}
