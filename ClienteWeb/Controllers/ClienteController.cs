using System.Collections.Generic;
using System.Text.Json;
using ClienteWeb.Models;
using ClienteWeb.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace ClienteWeb.Controllers
{
    
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        private RepositorioCliente _repositorioCliente = new RepositorioCliente();
        
        [HttpGet]
        public List<Cliente> Get()
        {
            
            
            var listDeClientes = new JsonResult(_repositorioCliente.ListarTodos());

            

            
            
            

            return _repositorioCliente.ListarTodos();
        }
    }
}