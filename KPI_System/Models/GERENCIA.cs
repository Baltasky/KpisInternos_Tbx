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
    
    public partial class GERENCIA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GERENCIA()
        {
            this.OrdenServicios = new HashSet<OrdenServicio>();
        }
    
        public short GerCod { get; set; }
        public int LocCod { get; set; }
        public System.DateTime GerFchCre { get; set; }
        public string GerAbr { get; set; }
        public string GerDsc { get; set; }
        public short SubdCod { get; set; }
    
        public virtual LOCALIZACIONE LOCALIZACIONE { get; set; }
        public virtual Subdireccione Subdireccione { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdenServicio> OrdenServicios { get; set; }
    }
}
