using System;
using System.Collections.Generic;
using System.Text.Json;
using ClienteWeb.Models;
using ClienteWeb.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace ClienteWeb.Controllers
{
    
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private RepositorioCliente _repositorioCliente = new RepositorioCliente();
        
        [HttpGet]
        public List<Cliente> Get()
        {
            List<Cliente> clientes = new List<Cliente>();

            
                clientes = _repositorioCliente.ListarTodos();
                
                return clientes;

        }
        
        [HttpGet("{id}")] 
        public Cliente GetClienteId(int id)
        {
            var cliente = new Cliente();
            cliente = _repositorioCliente.BuscarPeloId(id);
            return cliente;
        }

        [HttpPost]
        public void InserirCliente([FromBody]Cliente cliente)
        {
            _repositorioCliente.Inserir(cliente);
            var id =cliente.Id;
        }
    }
}