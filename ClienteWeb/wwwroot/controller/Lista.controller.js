sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller , History, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Lista", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.attachRouter("listaName", this.buscarNoServidor)
			
		},


		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				id: window.encodeURIComponent(oItem.getBindingContext("cliente").getProperty("id"))
			});
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
		
		buscarNoServidor: async function (){
			this.handlePress("carregando");
			
			const dados = await fetch(`/api/Cliente`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente)
			this.getView().setModel(oModel, "cliente");
			
			this.handlePress("carregado");
		},

		navegarParaCadastro : function (){
			var oRouter = this.getOwnerComponent().getRouter();	
				 oRouter.navTo("cadastroDeCliente");
		}
		
	});
});