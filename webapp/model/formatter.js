sap.ui.define([], function () {
    "use strict";
    return {
        statusText: function (sStatus) {

            switch (sStatus) {
                case "KZM":
                    return "Kazhakkoottam";
                case "ULO":
                    return "Ulloor";
                case "KUL":
                    return "Kulathoor";
                case "M":
                    return "Morning";
                case "N":
                    return "Night";
                case "F":
                    return "Full Time";
                
                default:
                    return sStatus;
            }
        }

      
    
};
});