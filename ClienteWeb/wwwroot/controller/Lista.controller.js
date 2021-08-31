sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller , History, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Lista", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.buscarNoServidor()
		},


		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
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
			const dados = await fetch(`https://localhost:5001/Cliente`);
			const cliente = await dados.json();


			var oModel = new JSONModel();
			
			for (var i = 0;i<cliente.length;i++){
				oModel = cliente[i];
				console.log(cliente[i])
				
			}
			this.getView().setModel(oModel, "cliente");
		}
		
		

	});
});