sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox"
    ],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("com.applexus.happysitter.controller.login", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onBabysitterClick: function (oEvent) {


                this.oRouter.navTo("BRegister");

            },
            onparentclick: function (oEvent) {


                this.oRouter.navTo("pregister");

            },

             onLiveChange: function (event) {

                 var input = event.getSource();

                var FName = this.getView().byId("name").getValue();
                 var pasword = this.getView().byId("_IDGenInput1").getValue();
              
                if (FName) {

                   

                    if (!FName || FName.length > 10 ) {

                        sap.m.MessageToast.show(" Invalid Entry for UserId");


                        input.setValueState("Error");

                    } else {

                        input.setValueState("None");

                    } 
                }
                if (pasword) {

                   

                    if (!pasword || pasword.length > 8 ) {

                        sap.m.MessageToast.show("Invalid Entry for password");


                        input.setValueState("Error");

                    } else {

                        input.setValueState("None");

                    } 
                }
            },

            onlogin: function (oEvent) {

                var JsonModel = new sap.ui.model.json.JSONModel();

                var odataModel = this.getOwnerComponent().getModel();

                var oBusyDialog = new sap.m.BusyDialog({

                    title: "Logging in",

                    text: "Loading..!"
                });

                oBusyDialog.open();
                
                var fSuccess = function (Oresp, data) {


                    oBusyDialog.close();

                   


                    if (Oresp.Type == "P") {

                       
                        this.oRouter.navTo("phome", {

                            "LoginId": userid

                        });
                        //console.log(userid)
                    }
                    else if (Oresp.Type == "A") {

                        this.oRouter.navTo("admin", {

                            "LoginId": userid
                        });
                    }
                    else {

                       
                        this.oRouter.navTo("bhome", {

                            "LoginId": userid

                        });
                    }

                }.bind(this);


                var ferror = function (oerror) {

                    

                    oBusyDialog.close();

                    MessageBox.alert(

                        "Wrong username or password",

                        {



                        }

                    );

                }

                var parameters = {

                    "context": this,

                    "success": fSuccess,

                    "error": ferror



                }

                var userid = this.getView().byId("name").getValue();

                var pwd = this.getView().byId("_IDGenInput1").getValue();



                odataModel.read("/loginSet(LoginId='" + userid + "',Password='" + pwd + "')", parameters);
               
            },

        });
    });
