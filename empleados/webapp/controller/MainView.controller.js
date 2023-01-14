
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
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
            Main.prototype.onvalidate = function(){
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
        return Main;
    });
