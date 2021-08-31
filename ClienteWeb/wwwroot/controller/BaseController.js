sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("invent.clientes.controller.Base", {
            
       getRouter: function (){
         return this.getOwnerComponent().getRouter();  
       },
        
        attachRouter(routerName, func){
           const router =   this.getRouter();
           
           if (!!routerName){
               router.getRoute(routerName).attachPatternMatched(func, this)
           }else {
               router.attachRouter(func, this);
           }
             
           
        }

    });
});