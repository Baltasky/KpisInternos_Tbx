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
    
    public partial class ALMACENE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ALMACENE()
        {
            this.EVIDENCIAS = new HashSet<EVIDENCIA>();
            this.LogersDetalles = new HashSet<LogersDetalle>();
            this.PRODUCTOSUBICACIONs = new HashSet<PRODUCTOSUBICACION>();
            this.PRODUCTOSUBICACIONs1 = new HashSet<PRODUCTOSUBICACION>();
        }
    
        public short AlmCod { get; set; }
        public string AlmNom { get; set; }
        public short AlmTip { get; set; }
        public Nullable<short> AlmSubAlmCod { get; set; }
        public System.DateTime AlmFchCre { get; set; }
        public short AlmUsuCodCre { get; set; }
        public Nullable<System.DateTime> AlmFchMod { get; set; }
        public Nullable<short> AlmUsuCodMod { get; set; }
        public short AlmConcod { get; set; }
        public Nullable<short> TConCod { get; set; }
        public Nullable<short> AlmBasCod { get; set; }
        public string AlmAli { get; set; }
        public Nullable<short> AlmCla { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EVIDENCIA> EVIDENCIAS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LogersDetalle> LogersDetalles { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PRODUCTOSUBICACION> PRODUCTOSUBICACIONs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PRODUCTOSUBICACION> PRODUCTOSUBICACIONs1 { get; set; }
    }
}
