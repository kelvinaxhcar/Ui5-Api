sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Inserir", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			

			this.setClienteModel(this.criandoModeloJsonCliente());
		},

		

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},
		criandoModeloJsonCliente: function(){
			let clientEmBranco = {
				nome: "",
				cpf: "",
				cep: "74640140",
				rua: "",
				bairro: "",
				numero: "",
				estado: "",
				municipio: "",
				email: "",
				telefone: ""
				
			};
			return clientEmBranco;
		},
		setClienteModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getClienteModel: function () {
			return this.getView().getModel("cliente").getData();
		},

		buscarEndereco: async function () {

			try {
				let cliente = this.getClienteModel();
				if (cliente.cep == "") {
					MessageBox.warning("Preencha todos os campos");
				} else {
					const dados = await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`);
					const endereco = await dados.json();

					cliente.logradouro = endereco.logradouro;
					cliente.bairro = endereco.bairro;
					cliente.numero = endereco.gia;
					cliente.estado = endereco.uf;
					cliente.municipio = endereco.localidade;

				}
				console.log(cliente)


				this.setClienteModel(cliente);
			} catch (error) {
				MessageBox.error(`Erro ao fazer consulta! ${error}`);
			}
		},

		

		verificaSeOsCamposEstaoVazios: function (ModelCliente) {
			let cliente = ModelCliente;
			if (cliente.cep != "" && cliente.nome != "" && cliente.cpf != "" && cliente.email != "" && cliente.telefone != "" &&
				cliente.logradouro != "" && cliente.bairro != "" && cliente.gia != "" && cliente.uf != "" && cliente.localidade != "") {
				return ModelCliente;
			} else {
				MessageBox.warning("Preencha todos os campos");
				return null;
			}

		},

		salvarNoBancoDeDados: function () {

			
			let cliente = this.verificaSeOsCamposEstaoVazios(this.getClienteModel())

			if (cliente != null){
				MessageBox.success("Registro salvo com sucesso");
				this.setClienteModel(this.criandoModeloJsonCliente());
			}
			console.log(cliente)
			const uri = '/api/Cliente';
			fetch(uri, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(cliente)
			});

		},

	});
});