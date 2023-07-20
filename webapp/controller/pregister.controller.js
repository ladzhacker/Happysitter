sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
  ],
  function (BaseController, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("com.applexus.happysitter.controller.pregister", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("pregister");
        this.oRouter.getRoute("confirmpage");

        this.getView().byId("DP2").setMinDate(new Date("2020-01-1"));
        this.getView().byId("DP2").setMaxDate(new Date());
      },
      onPress: function (oEvent) {


        this.oRouter.navTo("Routelogin");

        this.getView().byId("name").setValue("");
        this.getView().byId("ndagme").setValue("");
        this.getView().byId("ndame").setValue("");
        this.getView().byId("phone").setValue("");
        this.getView().byId("r6bg3").getSelectedButton().setText("");
        this.getView().byId("_IDGenInput5").setValue("");
        this.getView().byId("_IHFDGenInput371").setValue("");
        this.getView().byId("hname").setValue("");
        this.getView().byId("street").setValue("");
        this.getView().byId("city").setValue("");
        this.getView().byId("pcode").setValue("");
        this.getView().byId("type").getValue();
        this.getView().byId("bname").setValue("");
        // this.getView().byId("bgender").getSelectedButton().setText("");
        this.getView().byId("DP2").setDateValue("");
       this.getView().byId("ta1").setValue("");    
        
      },
      onLiveChange: function (event) {
        var input = event.getSource();

        var name = this.getView().byId("name").getValue();
        var password = this.getView().byId("ndagme").getValue();
        var email = this.getView().byId("ndame").getValue();
        var Phonenumber = this.getView().byId("phone").getValue();
        var AadhaarNo = this.getView().byId("_IHFDGenInput371").getValue();
        var HouseName = this.getView().byId("hname").getValue();
        var PostCode = this.getView().byId("pcode").getValue();
  
        var bname = this.getView().byId("bname").getValue();


        if (name) {

            var pattern = /^[a-zA-Z\s]*$/;

            if (!pattern.test(name)) {

                sap.m.MessageToast.show("Only text characters are allowed.");



                input.setValueState("Error");

            } else {

                input.setValueState("None");

            }



        }
        if (HouseName) {

          var pattern = /^[a-zA-Z\s]*$/;

          if (!pattern.test(HouseName)) {

              sap.m.MessageToast.show("Only text characters are allowed.");



              input.setValueState("Error");

          } else {

              input.setValueState("None");

          }



      }
        if (bname) {

          var pattern = /^[a-zA-Z\s]*$/;

          if (!pattern.test(bname)) {

              sap.m.MessageToast.show("Only text characters are allowed.");



              input.setValueState("Error");

          } else {

              input.setValueState("None");

          }



      }

        if (Phonenumber) {



            if (Phonenumber.length != 10) {

                sap.m.MessageToast.show("Contact Number cannot be empty & Length should be 10!");


                input.setValueState("Error");

            }


            else {

                input.setValueState("None");

            }

        }
        // if (PostCode) {



        //   if (PostCode.length != 6) {

        //       sap.m.MessageToast.show("Post code should not be greater than 6!");


        //       input.setValueState("Error");

        //   }


      //     else {

      //         input.setValueState("None");

      //     }

      // }
        if (password) {



            if (password.length > 8) {

                sap.m.MessageToast.show("Password greater than 8!");


                input.setValueState("Error");

            }


            else {

                input.setValueState("None");

            }

        }

        if (AadhaarNo) {



            if (AadhaarNo.length != 12) {

                sap.m.MessageToast.show("Aadhaarcard Number should be 12 characters");


                input.setValueState("Error");

            }


            else {

                input.setValueState("None");

            }

        }
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

      oncreate: function (oEvent) {
        var mailregex = /^\w+[\w-+\.com]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

        var oDataModel = this.getOwnerComponent().getModel();
        var name = this.getView().byId("name").getValue();
        var password = this.getView().byId("ndagme").getValue();
        var email = this.getView().byId("ndame").getValue();
        var Phonenumber = this.getView().byId("phone").getValue();
        var gender = this.getView().byId("r6bg3").getSelectedButton().getText();
        var Profession = this.getView().byId("_IDGenInput5").getValue();
        var AadhaarNo = this.getView().byId("_IHFDGenInput371").getValue();
        var HouseName = this.getView().byId("hname").getValue();
        var Street = this.getView().byId("street").getValue();
        var City = this.getView().byId("city").getValue();
        var PostCode = this.getView().byId("pcode").getValue();
       
        var bname = this.getView().byId("bname").getValue();
        var bgender = this.getView().byId("bgender").getSelectedButton().getText();
        var bdob = this.getView().byId("DP2").getDateValue();
        var med = this.getView().byId("ta1").getValue();
        


        var oRecord = {

          "Pname": name,
          "Email": email,
          "PhoneNumber": Phonenumber,
          "Pgender": gender,
          "Profession": Profession,
          "PaadhaarcardNumber": AadhaarNo,
          "Password": password,
          "HouseName": HouseName,
          "Street": Street,
          "City": City,
          "PostCode": PostCode,
          
          "BName": bname,
          "BGender": bgender,
          "BDob": bdob,
          "DietPlan": med


        };



       

        var oBusyDialog = new sap.m.BusyDialog({
          title: "Adding Record",
          text: "Please Wait ...",
          customIcon: "sap-icon://synchronize"

        });



        var fSucess = function (odata, oResponse) {
          oBusyDialog.close();

         


          MessageBox.alert(
            "Your LoginID is : " + odata.LoginId


          );
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

        if (!name) {

          MessageToast.show("Name can't be empty");

        }
        else if (!email.match(mailregex)) {

          MessageToast.show("This is not a valid email");
        }
        
        else if (!password || password.length != 8) {

          MessageToast.show("Password Should be 8 character long");

        }
        else if (!Phonenumber || Phonenumber.length != 10) {

          MessageToast.show("Contact Number cannot be empty & Length should be 10");

        }

        else if (!gender) {

          MessageToast.show("Gender cannot be empty");

        }
        else if (!AadhaarNo || AadhaarNo.length != 12) {

          MessageToast.show("Aadhaarcard Number should be 12 characters");

        }


        else if (!HouseName) {

          MessageToast.show("House Name can't be empty");

        }

        else if (!Street) {

          MessageToast.show("Street can't be empty");

        }
        else if (!PostCode || PostCode.length != 6) {

          MessageToast.show("Postcode Should be 6 Character Long ");

        }

        else if (!City ) {

          MessageToast.show("City cannot be empty");

        }
        else if (!bname) {

          MessageToast.show("Baby name cannot be empty");

        }
        else if (!bname) {

          MessageToast.show("Baby name cannot be empty");

        }
        else if (!bgender) {

          MessageToast.show("Baby gender cannot be empty");

        }
        else if (!bdob) {

          MessageToast.show("Baby DOB cannot be empty");

        }
        else if (!med ) {

          MessageToast.show("Baby Medical Details must be entered");

        }




        else {

         

          oDataModel.create("/parentregisterSet", oRecord, parameters);


          var name = this.getView().byId("name").setValue("");
          var password = this.getView().byId("ndagme").setValue("");
          var email = this.getView().byId("ndame").setValue("");
          var Phonenumber = this.getView().byId("phone").setValue("");
         
          var Profession = this.getView().byId("_IDGenInput5").setValue("");
          var AadhaarNo = this.getView().byId("_IHFDGenInput371").setValue("");
          var HouseName = this.getView().byId("hname").setValue("");
          var Street = this.getView().byId("street").setValue("");
          var City = this.getView().byId("city").setValue("");
          var PostCode = this.getView().byId("pcode").setValue("");
         
          var bname = this.getView().byId("bname").setValue("");
         
          var bdob = this.getView().byId("DP2").setDateValue("");
          var med = this.getView().byId("ta1").setText("");
          
          
        }
      }
    });
  }
);