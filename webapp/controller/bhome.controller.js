sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    
    ],
    function(BaseController,Filter,FilterOperator) {
      "use strict";
  
      return BaseController.extend("com.applexus.happysitter.controller.bhome", {
        onInit() {
          var oRouter = this.getOwnerComponent().getRouter();

        oRouter.getRoute("bhome").attachPatternMatched(this._onObjectMatched, this);
      
       

      },

        

      _onObjectMatched: function (oEvent) {

        this.onRead();

        this.loginid = oEvent.getParameter("arguments").LoginId;
        },
        onl: function(oEvent){
        

          this.oRouter.navTo("Routelogin");
          this.getView().byId("name").setValue("");
          this.getView().byId("_IDGenInput1").setValue("");
       
  
        },

        onlogout: function(oEvent){

          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Routelogin");
          // this.getView().byId("name").setValue("");
          // this.getView().byId("_IDGenInput1").setValue("");
        },

        OnClick:function(oEvent)

        {

            var sSearch = oEvent.getParameter("newValue");

            var oFilter1 = new Filter("BDATE", FilterOperator.Contains, sSearch);

            // var oFilter2 = new Filter("", FilterOperator.Contains, sSearch);

            var aFilter = [];

            aFilter.push(oFilter1);

            // aFilter.push(oFilter2);

            var oMaster = new Filter({ filters: aFilter, and: false });

            var oList = this.getView().byId("tb1");

            var oBinding = oList.getBinding("rows");

            oBinding.filter(oMaster);

        },
  
        onRead: function (oEvent) {
        
          var afilter = [];
          var oJSONModel = new sap.ui.model.json.JSONModel();
          var oDATAModel = this.getOwnerComponent().getModel();
          afilter.push(new Filter("LoginId", FilterOperator.EQ, this.loginid));
          var fSuccess = function (oResponse) {

              oJSONModel.setProperty("/bs", oResponse.results);

              this.getView().setModel(oJSONModel, "json");

             


          }.bind(this);

          
             
            var fError = function (oError) {
              var json = new sap.ui.model.json.JSONModel(JSON.parse(oError.responseText));
              sap.m.MessageBox.show(json.oData.error.message.value, sap.m.MessageBox.Icon.ERROR);
    
              //alert("Error Adding Details kindly verify Entered Details")
    
          }.bind(this);
            

          

          var parameters = {

              "filters": afilter,

              "context": this,

              "success": fSuccess,

              "error": fError

          };




        

          oDATAModel.read("/bsbookdisplaySet", parameters);

         


      },

      onbaby: function (oEvent) 
      {
        
        var oDATAModel = this.getOwnerComponent().getModel();
        var oJSONModel = new sap.ui.model.json.JSONModel();
       
        var fSuccess = function (oResponse) {

            oJSONModel.setProperty("/baby", oResponse);

            this.getView().setModel(oJSONModel, "json1");


        }.bind(this);

        var fError = function (oResponse) {
          alert("error")

          

        };

        var parameters = {

        

            "context": this,

            "success": fSuccess,

            "error": fError

        };

        var id = oEvent.getSource().getBindingContext("json").getObject().PLoginid;


      
       

     
        oDATAModel.read("/babydetailsSet('" + id + "')",parameters);

        

         

        
        this.getView().byId("d1").setVisible(true).open();   
    },
    onok:function (oEvent) 
    {
      this.getView().byId("d1").setVisible(true).close();   
    }

  
      });
    }
  );