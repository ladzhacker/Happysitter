sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageToast",
        "../model/formatter",
        "sap/m/MessageBox"
    ],
    function (BaseController, Filter, FilterOperator,MessageToast,formatter,MessageBox) {
        "use strict";

        return BaseController.extend("com.applexus.happysitter.controller.pbook", {
            formatter: formatter,
            onInit() {

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("pbook").attachPatternMatched(this._onObjectMatched, this);
                //this.loginid = oEvent.getParameter("arguments").LoginId;
            },
            _onObjectMatched: function (oEvent) {

                this.loginid = oEvent.getParameter("arguments").LoginId;
                this.onRead();

            },
            onBook: function(oEvent){

                this.oRouter.navTo("phome");
        
              },
        
            onRead: function (oEvent) {
                // debugger;
                var afilter = [];
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oDATAModel = this.getOwnerComponent().getModel();
                afilter.push(new Filter("LoginId", FilterOperator.EQ, this.loginid));
                var fSuccess = function (oResponse) {

                    oJSONModel.setProperty("/parent", oResponse.results);

                    this.getView().setModel(oJSONModel, "json");

                    oBusyDialog.close();


                }.bind(this);
                var fError = function (oError) {
                    var json = new sap.ui.model.json.JSONModel(JSON.parse(oError.responseText));
                    sap.m.MessageBox.show(json.oData.error.message.value, sap.m.MessageBox.Icon.ERROR);
                    oBusyDialog.close();
                    //alert("Error Adding Details kindly verify Entered Details")

                }.bind(this);

                // var fError = function (oResponse) {
                //     var json = new sap.ui.model.json.JSONModel(JSON.parse(Error.responseText))
                //     sap.m.MessageBox.show(json.oData.error.message.value, sap.m.MessageBox.Icon.ERROR)

                //     oBusyDialog.close();

                // };

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

                oBusyDialog.open();

                oDATAModel.read("/pbookdisplaySet", parameters);


            },
            
            ONCANCEL:function (oEvent){
               
                var oRowContext = oEvent.getSource();

                var id = oEvent.getSource().getBindingContext("json").getObject().Bookid;

                var oModel = this.getOwnerComponent().getModel();

                var oRecord = {

                    "Bstatus": "C"

                };

                var fSucess = function (odata, oResponse) {

                    var msg = ' Booking  Cancelled';

                    MessageToast.show(msg);

                  this.onRead();

                   
                    //




                }.bind(this);

                var fError = function (oError) {

                    

                }.bind(this);

                var parameters = {

                    "context": this,

                    "success": fSucess,

                    "error": fError

                }

               // oModel.refresh(true);

                oModel.sDefaultUpdateMethod = "PUT";

                oModel.update("/bookingregSet(Bookid='" + id + "')", oRecord, parameters); 
                
               
            }





        });
    }
);
