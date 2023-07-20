sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "../model/formatter"
  ],
  function (Controller, Filter, FilterOperator, MessageToast, formatter) {
    "use strict";

    return Controller.extend("com.applexus.happysitter.controller.phome", {
      formatter: formatter,
      onInit() {

        var oRouter = this.getOwnerComponent().getRouter();
        // this.byId("DP2").setMaxDate(new Date(2025, 06, 11));

        oRouter.getRoute("phome").attachPatternMatched(this._onObjectMatched, this);
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("pbook");
        // 
      },
      _onObjectMatched: function (oEvent) {


        this.loginid = oEvent.getParameter("arguments").LoginId;
        this.getView().byId("DP2").setMinDate(new Date());
        // this.getView().byId("DP2").setMinDate(new Date("2023-06-14"));
        this.getView().byId("DP2").setMaxDate(new Date("2025-06-11"));
        this.getView().byId("DPF2").setMinDate(new Date());
        this.getView().byId("DPF2").setMaxDate(new Date("2025-06-11"));



      },

      onlogin: function(oEvent){

        
        this.oRouter.navTo("Routelogin");
        this.getView().byId("name").setValue("");
        this.getView().byId("_IDGenInput1").setValue("");
      },

      onPress: function(oEvent){
        

        this.oRouter.navTo("Routelogin");
        this.getView().byId("name").setValue("");

        this.getView().byId("_IDGenInput1").setValue("");
     


      },

      ondrag: function (oEvent) {
        
        this.oRouter.navTo("pbook", {

          "LoginId": this.loginid
        });

      },

      onbookclick: function (oEvent) {

        // 
        var sadte = this.getView().byId("DP2").getDateValue();
        var fadate = this.getView().byId("DPF2").getDateValue();
        var pl = this.getView().byId("p1").getSelectedKey();
        var ps = this.getView().byId("s1").getSelectedKey();
        var mkd = this.getView().byId("radio").getSelectedButton().getText();


        var oJSONModel = new sap.ui.model.json.JSONModel();

        var oDATAModel = this.getOwnerComponent().getModel();

        var afilter = [];
        afilter.push(new Filter("LoginId", FilterOperator.EQ, this.loginid));

        afilter.push(new Filter("Sdate", FilterOperator.EQ, sadte));
        afilter.push(new Filter("Fdate", FilterOperator.EQ, fadate));
        afilter.push(new Filter("PreferredLocation", FilterOperator.EQ, pl));
        afilter.push(new Filter("PreferredShift", FilterOperator.EQ, ps));
        afilter.push(new Filter("MultipleKidOption", FilterOperator.EQ, mkd));

        var fSuccess = function (oResponse) {

          oJSONModel.setProperty("/BABYSITTER", oResponse.results);

          this.getView().setModel(oJSONModel, "json");


          


        }.bind(this);

        // var fError = function (oResponse) {

        //   alert("Error");

        // };
        var fError = function (oError) {
          var json = new sap.ui.model.json.JSONModel(JSON.parse(oError.responseText));
          sap.m.MessageBox.show(json.oData.error.message.value, sap.m.MessageBox.Icon.ERROR);

    

      }.bind(this);

        var parameters = {

          "filters": afilter,

          "context": this,

          "success": fSuccess,

          "error": fError

        };




        var oBusyDialog = new sap.m.BusyDialog({


          title: "Loading Data",

          text: "... Loading Data",

          showCancel: true

        });

        // oBusyDialog.open();
        if (!pl) {

          MessageToast.show("Preferred location cannot be empty");

        }

        else if (!ps) {

          MessageToast.show("Preferred shift cannot be empty");

        }

        else if (!sadte) {

          MessageToast.show("Start date cannot be empty");

        }

        else if (!fadate) {

          MessageToast.show("End date cannot be empty");

        }
        else if (((Date.parse(fadate) < Date.parse(sadte))) ){
          MessageToast.show("Start Date Should be less than end date");
        }
        else{
          
          oDATAModel.read("/bsdisplaySet", parameters);


        }

       

      

      },
      
      
      onbook: function (oEvent) {
       
        var id = oEvent.getSource().getBindingContext("json").getObject().BLoginid;
        console.log(id);
        var oDataModel = this.getOwnerComponent().getModel();

        var sadte = this.getView().byId("DP2").getDateValue();
        var fadate = this.getView().byId("DPF2").getDateValue();
        var pl = this.getView().byId("p1").getSelectedKey();
        var ps = this.getView().byId("s1").getSelectedKey();


        



        var oRecord = {
          "BLoginid": id,
          "Sdate": sadte,
          "Fdate": fadate,
          "Location": pl,
          "Shift": ps,
          "PLoginid": this.loginid

        };



     

        var oBusyDialog = new sap.m.BusyDialog({
          title: "Adding Record",
          text: "please Wait ...",
          customIcon: "sap-icon://synchronize"

        });


        
        var fSucess1 = function (odata, oResponse) {
          
          this.onbookclick();
          
        
          MessageToast.show("Booking Success");
        
          
         


        }.bind(this);

        var fError1 = function (oError) {
     
          alert("Booking Failed");
          this.onbookclick;
        }.bind(this);

        var parameters = {

          "context": this,

          "success": fSucess1,

          "error": fError1

        }



        oDataModel.create("/bookingregSet", oRecord, parameters);
      }

    });
  }
);

