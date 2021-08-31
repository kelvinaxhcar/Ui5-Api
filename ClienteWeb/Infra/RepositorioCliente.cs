﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net.Sockets;
using ClienteWeb.Models;

namespace ClienteWeb.Repositorio
{
    public class RepositorioCliente
    {
        public SqlConnection Open()
        {
            var dbCoonection = new SqlConnection(
                "Server=147.182.248.84;Database=ClienteInvent;UID=sa;Password=7878w1zKl");

            dbCoonection.Open();

            if (dbCoonection.State != ConnectionState.Open)
            {
                throw new Exception("Nao foi possivel se conectar");
            }

            return dbCoonection;
        }

        public List<Cliente> ListarTodos()
        {
            var listDeClientes = new List<Cliente>();

            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Cliente";

                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {

                        var cliente = new Cliente
                        {
                            Id = dbReader.IsDBNull("Id_Cliente") ? default : dbReader.GetInt32("Id_Cliente"),
                            Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome"),
                            Cpf = dbReader.IsDBNull("Cpf") ? default : dbReader.GetString("Cpf"),
                            
                        };
                        listDeClientes.Add(cliente);
                        
                    }
                }
            }

            
            return listDeClientes;
        }
        
        public Cliente BuscarPeloId(int id)
        {
            var cliente = new Cliente();
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = $"SELECT * FROM Cliente WHERE  Id_Cliente = {id}";

                    command.CommandText = query;
                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {

                        cliente.Id = dbReader.IsDBNull("Id_Cliente") ? default : dbReader.GetInt32("Id_Cliente");
                        cliente.Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome");
                        cliente.Cpf = dbReader.IsDBNull("Cpf") ? default : dbReader.GetString("Cpf");
                    }
                }
            }
            return cliente;
        }
        
        public void Inserir(Cliente cliente)
        {
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = $"INSERT INTO Cliente(nome, Cpf) VALUES ( '{cliente.Nome}', '{cliente.Cpf}')";

                    command.CommandText = query;

                    

                    command.ExecuteNonQuery();
                }
            }
        }
    }
}