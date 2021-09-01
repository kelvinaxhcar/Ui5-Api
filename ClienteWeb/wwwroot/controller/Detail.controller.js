sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Detail", {

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
			
			
		},
		
		_onObjectMatched:async function (oEvent) {
			this.Id = oEvent.getParameter("arguments").id;
			
			const dados = await fetch(`/api/Cliente/${this.Id}`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente);
			this.getView().setModel(oModel, "cliente");
			
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("listaName", {}, true);
			}
		},
		

		deletarCliente:async function (oEvent){
			const cliente = this.getView().getModel("cliente").getData();
			console.log(cliente.id)
			const uri = await fetch(`/api/Cliente/${cliente.id}`, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});
			const content = await uri.json();
			
			console.log(content);
		}
	});
});