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
    
    public partial class NOTAINFORMATIVA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NOTAINFORMATIVA()
        {
            this.MANTTOREFs = new HashSet<MANTTOREF>();
            this.NOTAINFORMATIVADETALLEs = new HashSet<NOTAINFORMATIVADETALLE>();
        }
    
        public int NotCod { get; set; }
        public short NotConCod { get; set; }
        public short NotAlmCod { get; set; }
        public System.DateTime NotFchSol { get; set; }
        public Nullable<System.DateTime> NotFchRec { get; set; }
        public short NotTip { get; set; }
        public string NotFol { get; set; }
        public string NotFolNot { get; set; }
        public int PedCod { get; set; }
        public Nullable<int> NotSupEmpCod { get; set; }
        public Nullable<short> NotSupEmpComCod { get; set; }
        public Nullable<int> NotAteEmpCod { get; set; }
        public Nullable<short> NotAteEmpComCod { get; set; }
        public Nullable<System.DateTime> NotFchNot { get; set; }
        public Nullable<short> NotVal { get; set; }
        public short NotEstCod { get; set; }
        public string NotObs { get; set; }
        public int NotMovCon { get; set; }
        public short NotMovConCod { get; set; }
        public short NotMovAlmCod { get; set; }
        public short NotMovTipDoc { get; set; }
        public short NotMovTprCod { get; set; }
        public System.DateTime NotMovFch { get; set; }
        public short NotVer { get; set; }
        public byte[] NotArcValPre { get; set; }
        public string NotArcValPreNom { get; set; }
        public string NotArcValPreTip { get; set; }
        public byte[] NotArcValDev { get; set; }
        public string NotArcValDevNom { get; set; }
        public string NotArcValDevTip { get; set; }
        public short NotUsuCodCre { get; set; }
        public System.DateTime NotFchCre { get; set; }
        public Nullable<short> NotUsuCodMod { get; set; }
        public Nullable<System.DateTime> NotFchMod { get; set; }
        public string NotNot { get; set; }
        public string NotMovFolTra { get; set; }
        public Nullable<System.DateTime> NotMovFolTraFch { get; set; }
        public string NotMovFolTraMan { get; set; }
        public Nullable<System.DateTime> NotMovFolTraManFch { get; set; }
        public string NotMovFolSolRef { get; set; }
        public Nullable<System.DateTime> NotMovFolSolRefFch { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MANTTOREF> MANTTOREFs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NOTAINFORMATIVADETALLE> NOTAINFORMATIVADETALLEs { get; set; }
    }
}