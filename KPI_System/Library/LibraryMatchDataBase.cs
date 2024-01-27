using KPI_System.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KPI_System.Library
{
    public class LibraryMatchDataBase
    {
        protected Entities _dbTb4;

        public LibraryMatchDataBase()
        {
            _dbTb4 = new Entities();
            _dbTb4.Configuration.LazyLoadingEnabled = false;
            _dbTb4.Configuration.ProxyCreationEnabled = false;
        }


    }
}