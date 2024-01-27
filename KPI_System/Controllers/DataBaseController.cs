using KPI_System.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers
{
    public class DataBaseController : Controller
    {
            protected Entities _dbTb4;

            public DataBaseController()
            {
                _dbTb4 = new Entities();
                _dbTb4.Configuration.LazyLoadingEnabled = false;
                _dbTb4.Configuration.ProxyCreationEnabled = false;
            _dbTb4.Database.CommandTimeout = 1500;
        }
    }
}