
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            var i18nModel = new sap.ui.model.resource.ResourceModel( { bundleName: "dhl.empleados.i18n.i18n" } );
            var oJsonModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            this.getView().setModel(i18nModel, "i18n");
            var i18nBundle = oView.getModel("i18n").getResourceBundle();
            // var i18nBundle = i18nModel.getResourceBundle();
            // var oJson = {
            //     EmployeeId: "123456",
            //     CountryKey: "UK",
            //     ListCountry: [
            //         {
            //             Key : "UK",
            //             Text : i18nBundle.getText("countryUK")
            //         },
            //         {
            //             Key : "US",
            //             Text : i18nBundle.getText("countryUS")
            //         },
            //         {
            //             Key : "ES",
            //             Text : i18nBundle.getText("countryES")
            //         },

            //     ]
            // };

            // oJsonModel.setData(oJson);
            //PAra cargar los datos del Json
            oJsonModel.loadData("../localService/Empleados.json", false);
            //Comprobamos si los datos se han cargado
          //  oJsonModel.attachRequestCompleted(function(oEventModel){
          //       console.log(JSON.stringify(oJsonModel.getData()));
          //  });
            //oView.setModel(oJsonModel, "trad");
            oView.setModel(oJsonModel);
            var oJsonModelCountries = new sap.ui.model.json.JSONModel();
            oJsonModelCountries.loadData("../localService/Countries.json", false);
            //Comprobamos si los datos se han cargado
          //  oJsonModelCountries.attachRequestCompleted(function(oEventModel){
          //      console.log(JSON.stringify(oJsonModel.getData()));
          // });
            oView.setModel(oJsonModelCountries,"Countries");
    
            var oJsonModelConfig = new sap.ui.model.json.JSONModel({
                visibleId: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });

            oView.setModel(oJsonModelConfig,"Config");
            
         

        }

        function onFilter(){
            var oJson = this.getView().getModel("Countries").getData();

            var filters = [];

            if (oJson.EmployeeId !== ""){
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJson.EmployeeId))
            }
            if (oJson.CountryKey !== ""){
                filters.push(new Filter("Country", FilterOperator.EQ, oJson.CountryKey))
            }

            var oList = this.getView().byId("tablaempleados");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        
        
        }

        function onClearFilter(){
            var oModel = this.getView().getModel("Countries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");

        }
        

        //Obtenemos el contexto 
        function showPostalCode(oEvent){
            var itemPress = oEvent.getSource();
            var oContext  = itemPress.getBindingContext();
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);


        }

        function onShowCity(){
            var oModeloConfig = this.getView().getModel("Config");
            oModeloConfig.setProperty("/visibleCity", true);
            oModeloConfig.setProperty("/visibleBtnShowCity",false);
            oModeloConfig.setProperty("/visibleBtnHideCity",true);


        }

        function onHideCity(){
            var oModeloConfig = this.getView().getModel("Config");
            oModeloConfig.setProperty("/visibleCity", false);
            oModeloConfig.setProperty("/visibleBtnShowCity",true);
            oModeloConfig.setProperty("/visibleBtnHideCity",false);
        }
        /* function myCheck() {
             var inputEmployee = this.byId("inputemployee");
             var valueEmployee = inputEmployee.getValue();
 
             if (valueEmployee.length === 6) {
                 inputEmployee.setDescription("OK");
             } else {
                 inputEmployee.setDescription("NO OK");
             };
         }*/
        /*return Controller.extend("dhl.empleados.controller.MainView", {
            onInit: function () {

            },
             //onvalidate: myCheck
             onvalidate: function(){
                var inputEmployee = this.byId("inputemployee");
                var valueEmployee = inputEmployee.getValue();
    
                if (valueEmployee.length === 6) {
                    inputEmployee.setDescription("OK");
                    this.byId("labelcountry").setVisible(true);
                    this.byId("slcountry").setVisible(true);
                } else {
                  inputEmployee.setDescription("NO OK");
                  this.byId("labelcountry").setVisible(false);
                  this.byId("slcountry").setVisible(false);
                };
            }
        });
    });
*/
        var Main = Controller.extend("dhl.empleados.controller.MainView", {});
        /*onvalidate: myCheck*/
        
        Main.prototype.onvalidate = function () {
            var inputEmployee = this.byId("inputemployee");
            var valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6) {
                inputEmployee.setDescription("OK");
                this.byId("labelcountry").setVisible(true);
                this.byId("slcountry").setVisible(true);
            } else {
                inputEmployee.setDescription("NO OK");
                this.byId("labelcountry").setVisible(false);
                this.byId("slcountry").setVisible(false);
            }
        };
        Main.prototype.onInit = onInit;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.onFilter = onFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        return Main;
    });
