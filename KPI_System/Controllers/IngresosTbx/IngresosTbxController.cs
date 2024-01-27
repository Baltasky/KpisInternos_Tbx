using KPI_System.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.IngresosTbx
{
    [SessionFilter]
    public class IngresosTbxController : Controller
    {
        // GET: IngresosTbx
        public ActionResult Index()
        {
            return View();
        }
    }
}