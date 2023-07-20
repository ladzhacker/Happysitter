sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function (BaseController, MessageToast) {
        "use strict";

        return BaseController.extend("com.applexus.happysitter.controller.bsregister", {
            onInit() {

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("BRegister");
                this.oRouter.getRoute("confirmpage");

                this.getView().byId("DP2").setMinDate(new Date("1974-01-01"));
                this.getView().byId("DP2").setMaxDate(new Date("2004-11-31"));

            },
            onPress: function (oEvent) {

                this.oRouter.navTo("Routelogin");
                this.getView().byId("name").setValue("");
                this.getView().byId("ndame").setValue("");
                this.getView().byId("ndagme").setValue("");
                this.getView().byId("cid").setValue("");
                this.getView().byId("aid").setValue("");
                this.getView().byId("ndame").setValue();
                this.getView().byId("ndamhe").setValue();
                this.getView().byId("ndagme").setValue();


            },
            onLiveChange: function (event) {
                var input = event.getSource();
                var name = this.getView().byId("name").getValue();
                // var phoneno = this.getView().byId("ndamhe").getValue();
                // var AadhaarNo = this.getView().byId("aid").getValue();
                var email = this.getView().byId("ndame").getValue();
                // var password = this.getView().byId("ndagme").getValue();



                if (name) {

                    var pattern = /^[a-zA-Z\s]*$/;

                    if (!pattern.test(name)) {

                        sap.m.MessageToast.show("Only text characters are allowed.");



                        input.setValueState("Error");

                    } else {

                        input.setValueState("None");

                    }



                }

                // if (phoneno) {



                //     if (phoneno.length != 10) {

                //         sap.m.MessageToast.show("Enter Valid Phone Number!");


                //         input.setValueState("Error");

                //     }


                //     else {

                //         input.setValueState("None");

                //     }

                // }
                // if (password) {



                //     if (password.length > 8) {

                //         sap.m.MessageToast.show("Password greater than 8!");


                //         input.setValueState("Error");

                //     }


                //     else {

                //         input.setValueState("None");

                //     }

                // }

                // if (AadhaarNo) {



                //     if (AadhaarNo.length != 12) {

                //         sap.m.MessageToast.show("Enter valid aadhaar card number");


                //         input.setValueState("Error");

                //     }


                //     else {

                //         input.setValueState("None");

                //     }

                // }
                if (email) {


                    var pattern = /^\w+[\w-+\.com]*\@\w+([-\.c]\w+)*\.[a-zA-Z]{2,}$/;
                    if (!pattern.test(email)) {

                        sap.m.MessageToast.show("Enter valid e-mail id!");


                        input.setValueState("Error");

                    }


                    else {

                        input.setValueState("None");

                    }

                }

            },


            oncreate: function () {
                var mailregex = /^\w+[\w-+\.com]*\@\w+([-\.c]\w+)*\.[a-zA-Z]{2,}$/;
                var pattern = /^[a-zA-Z\s]*$/;
                var oDataModel = this.getOwnerComponent().getModel();

                var name = this.getView().byId("name").getValue();
                var gender = this.getView().byId("r6bg3").getSelectedButton().getText();
                var DOB = this.getView().byId("DP2").getDateValue();
                var PreferredLocation = this.getView().byId("p1").getSelectedKey();
                var PreferredShift = this.getView().byId("s1").getSelectedKey();
                var CertificationID = this.getView().byId("cid").getValue();
                var AadhaarNo = this.getView().byId("aid").getValue();
                var MultipleKidOption = this.getView().byId("rbg3").getSelectedButton().getText();
                var email = this.getView().byId("ndame").getValue();
                var phoneno = this.getView().byId("ndamhe").getValue();
                var password = this.getView().byId("ndagme").getValue();



                var oRecord = {
                    "BsName": name,
                    "BsGender": gender,
                    "BsDob": DOB,
                    "PreferredLocation": PreferredLocation,
                    "PreferredShift": PreferredShift,
                    "Bcid": CertificationID,
                    "AadhaarCardNum": AadhaarNo,
                    "PhoneNo": phoneno,
                    "Email": email,
                    "Password": password,
                    "MultipleKidOption": MultipleKidOption

                };



                console.log(oRecord);

                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Adding Record",
                    text: "Please Wait ...",
                    customIcon: "sap-icon://synchronize"

                });



                var fSucess = function (odata, oResponse) {

                    oBusyDialog.close();
                    this.oRouter.navTo("confirmpage", {

                        "LoginId": odata.LoginId
                    });


                }.bind(this);

                var fError = function (oError) {
                    var json = new sap.ui.model.json.JSONModel(JSON.parse(oError.responseText));
                    sap.m.MessageBox.show(json.oData.error.message.value, sap.m.MessageBox.Icon.ERROR);

                    //alert("Error Adding Details kindly verify Entered Details")

                }.bind(this);

                var parameters = {

                    "context": this,

                    "success": fSucess,

                    "error": fError,




                }

                if (!name || !name.match(pattern)) {

                    MessageToast.show("Name cannot be empty");


                }
                else if (!email.match(mailregex)) {

                    MessageToast.show("This is not a valid email");
                }


                else if (!password || password < 8) {

                    MessageToast.show("Password should be 8 character long");

                }
                else if (!phoneno || phoneno.length != 10) {

                    MessageToast.show("Contact Number cannot be empty and length should be 10");

                }

                else if (!DOB) {

                    MessageToast.show("Date of birth can't be empty");

                }

                else if (!PreferredLocation) {

                    MessageToast.show("Preferred location can't be empty");

                }

                else if (!PreferredShift) {

                    MessageToast.show("Preferred shift can't be empty");

                }

                else if (!AadhaarNo || AadhaarNo.length != 12) {

                    MessageToast.show("Aadhaarcard Number Should be 12 Character Long");

                }


                else {



                    oDataModel.create("/bscreateSet", oRecord, parameters);



                    var name = this.getView().byId("name").setValue("");

                    var DOB = this.getView().byId("DP2").setValue("");
                    var PreferredLocation = this.getView().byId("p1").setValue("");
                    var PreferredShift = this.getView().byId("s1").setSelectedKey("");
                    var CertificationID = this.getView().byId("cid").setValue("");
                    var AadhaarNo = this.getView().byId("aid").setValue("");
                    var email = this.getView().byId("ndame").setValue("");
                    var phoneno = this.getView().byId("ndamhe").setValue("");
                    var password = this.getView().byId("ndagme").setValue("");

                }




            }
        });
    }
);
