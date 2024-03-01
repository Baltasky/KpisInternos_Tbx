using KPI_System.Models;
using KPI_System.Models.ClassesGlobales;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace KPI_System.Library
{
    public class LValidationLogin : LibraryMatchDataBase
    {
        public string Rot13(string value)
        {
            char[] array = value.ToCharArray();
            for (int i = 0; i < array.Length; i++)
            {
                int number = (int)array[i];

                if (number >= 'a' && number <= 'z')
                {
                    if (number > 'm')
                    {
                        number -= 13;
                    }
                    else
                    {
                        number += 13;
                    }
                }
                else if (number >= 'A' && number <= 'Z')
                {
                    if (number > 'M')
                    {
                        number -= 13;
                    }
                    else
                    {
                        number += 13;
                    }
                }
                array[i] = (char)number;
            }
            return new string(array);
        }
        public string Decode64(string valor)
        {
            byte[] data = Convert.FromBase64String(valor);
            string decodedString = Encoding.UTF8.GetString(data);
            return decodedString;
        }
        public string Encode64(string valor)
        {
            string encodedString = Convert.ToBase64String(Encoding.UTF8.GetBytes(valor));
            return encodedString;
        }
        public string Reverse(string s)
        {
            char[] charArray = s.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }


        public VariableSession ValidateUserPassword(LoginViewModel model)
        {
            var Result = new VariableSession();

            var password = model.Password.Trim();
            password = Rot13(password);
            password = Reverse(password);
            password = Encode64(password);

            if (password != "Error")
            {
                try
                {

                    var existUser = _dbTb4.Database.SqlQuery<System_User>("EXEC AppConfig_Login @ExecuteQuery=@ExecuteQuery, " +
                    "@Opcion=@Opcion, @Usuario=@Usuario  ", new object[]
                    {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("Usuario",  model.Usuario)
                    }).ToList<System_User>();

                    if (existUser.Any())
                    {
                        Result.Usuarios = existUser.First();

                        Result.Messege = password == existUser.First().Password ? Result.Messege = "" : "Correo o contraseña incorrecto!";
                        Result.Usuarios.Menus = existUser.First().Menus;
                        Result.Usuarios.MainRute = existUser.First().MainRute;

                        Result.Usuarios.Password = "";

                    }
                    else
                    {
                        Result.Messege = "Correo o contraseña incorrecto!";
                    }


                }
                catch (Exception e)
                {
                    Result.Messege = e.Message;

                }



            }
            else { Result.Messege = "Correo o contraseña incorrecto!"; }


            return Result;
        }

        public string DecodificarPassword(string correo)
        {
            var Result = "";

            var existUser = _dbTb4.Database.SqlQuery<System_User>("EXEC AppConfig_Login @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @Usuario=@Usuario  ", new object[]
            {
            new SqlParameter("ExecuteQuery", 1),
            new SqlParameter("Opcion", 1),
            new SqlParameter("Usuario",  correo)
            }).ToList<System_User>();

            if (existUser.Any())
            {
                var passwordCodificado = Decode64(existUser.First().Password);
                passwordCodificado = Reverse(passwordCodificado);
                passwordCodificado = Rot13(passwordCodificado);

                Result = passwordCodificado;
            }
            else
            {
                //Result = "El usuario no existe, envía un correo al administrador.";
                Result = "NoExiste";
            }

            return Result;
        }


    }
}