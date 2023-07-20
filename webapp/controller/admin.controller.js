sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "../model/formatter",
        
    ],
    function (BaseController,MessageBox,MessageToast,Filter,FilterOperator,formatter) {
        "use strict";

        return BaseController.extend("com.applexus.happysitter.controller.admin", {
            formatter: formatter,
            onInit() {

                this.oRouter = this.getOwnerComponent().getRouter();
                // this.onRead();


                //onbookclick: function (oEvent) {

                var oJSONModel = new sap.ui.model.json.JSONModel();

                var oDATAModel = this.getOwnerComponent().getModel();


                var fSuccess = function (oResponse) {

                    oJSONModel.setProperty("/BABYSITTER", oResponse.results);

                    this.getView().setModel(oJSONModel, "json");
                        
                    // oDATAModel.refresh(true);

                    oBusyDialog.close();


                }.bind(this);

                var fError = function (oResponse) {
                    

                    oBusyDialog.close();

                };

                var parameters = {


                    "context": this,

                    "success": fSuccess,

                    "error": fError

                };




                var oBusyDialog = new sap.m.BusyDialog({


                    title: "Loading Data",

                    text: ".. Loading Data ..",

                    showCancel: true

                });

               // oBusyDialog.open();

                oDATAModel.read("/babysitterSet", parameters);
               
                
           // },
            var fSuccess1 = function (oResponse) {

                oJSONModel.setProperty("/Book", oResponse.results);

                this.getView().setModel(oJSONModel, "bk");
                    
                // oDATAModel.refresh(true);

                oBusyDialog.close();


            }.bind(this);

            var fError1 = function (oResponse) {

                //oBusyDialog.close();

            };

            var parameters = {


                "context": this,

                "success": fSuccess1,

                "error": fError1

            };




            var oBusyDialog = new sap.m.BusyDialog({


                title: "Loading Data",

                text: ".. Loading Data ..",

                showCancel: true

            });

            //oBusyDialog.open();

            oDATAModel.read("/bookingregSet", parameters);
           
            
        
    },

    onlogout: function(oEvent){

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Routelogin");
        this.getView().byId("name").setValue("");
        this.getView().byId("_IDGenInput1").setValue("");
      },
    OnClick:function(oEvent)

    {
        debugger;
        var sSearch = oEvent.getParameter("newValue");

        var oFilter1 = new Filter("PreferredLocation", FilterOperator.Contains, sSearch);

       

        var aFilter = [];

        aFilter.push(oFilter1);

        // aFilter.push(oFilter2);

        var oMaster = new Filter({ filters: aFilter, and: false });

        var oList = this.getView().byId("t1");

        var oBinding = oList.getBinding("items");

        oBinding.filter(oMaster);
       
    },

    OnClick2:function(oEvent)

    {

        debugger;
        var sSearch = oEvent.getParameter("newValue");

        var oFilter1 = new Filter("Shift", FilterOperator.Contains, sSearch);

        // var oFilter2 = new Filter("", FilterOperator.Contains, sSearch);

        var aFilter = [];

        aFilter.push(oFilter1);

        // aFilter.push(oFilter2);

        var oMaster = new Filter({ filters: aFilter, and: false });

        var oList = this.getView().byId("idProductsThable");

        var oBinding = oList.getBinding("items");

        oBinding.filter(oMaster);
       
    },

            
            onBkl:function (oEvent){
                
       
                var oRowContext = oEvent.getSource();

                var id = oEvent.getSource().getBindingContext("json").getObject().LoginId;

                var oModel = this.getOwnerComponent().getModel();

                var oRecord = {

                    "Bsstatus": "B"

                };

                var fSucess = function (odata, oResponse) {

                    var msg = 'Babysitter Has been Deactivated';

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

                oModel.update("/babysitterSet(LoginId='" + id + "')", oRecord, parameters); 
                
               
            }

        }
        );

    });
