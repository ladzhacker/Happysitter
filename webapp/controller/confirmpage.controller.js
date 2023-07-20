sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.applexus.happysitter.controller.confirmpage", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            // this.getView().byId("jkgbriv").setValue(this.loginid);
           // var id = oEvent.getSource().getBindingContext("json").getObject().Loginid;
          
          
       this.oRouter.getRoute("confirmpage").attachPatternMatched(this._onObjectMatched, this);
       // this.oRouter = this.getOwnerComponent().getRouter();
       
       // this.oRouter.getRoute("pbook");

      },
      _onObjectMatched: function (oEvent) {

        

        this.loginid = oEvent.getParameter("arguments").LoginId;
        // alert(this.loginid)
        this.getView().byId("jkgbriv").setText(this.loginid)
        },
            
        

        onnav: function (oEvent) {
          
            this.oRouter.navTo("Routelogin");

        },
      });
    }
  );