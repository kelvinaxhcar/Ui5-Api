sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Overview", {
		
		navegarParaLista : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("listaName");
		},

		navegarParaCadastro : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("cadastroDeCliente");
		}

	});
});