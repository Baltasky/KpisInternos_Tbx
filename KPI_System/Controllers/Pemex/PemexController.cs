using KPI_System.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Pemex
{
    [SessionFilter]
    public class PemexController : Controller
    {
        // GET: Pemex
        public ActionResult Index()
        {
            return View();
        }
    }
}