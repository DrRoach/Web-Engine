var Engine = {};

/**
 * Global Variables
 */

//Set default value for REPORT_ERRORS of false if it hasn't been set.
if (typeof this.REPORT_ERRORS == "undefined") {
    Engine.REPORT_ERRORS = false;
} else {
    Engine.REPORT_ERRORS = this.REPORT_ERRORS;
}
var DEV_MODE = false;

var engineLoading = true;

//Make sure that jQuery is included
if (typeof $ == "undefined") {
    if (Engine.REPORT_ERRORS == true) {
        //Throw an error and end the script
        throw new Error("jQuery couldn't be found. Please include it to use the engine.");
    } else {
        //A error has to be thrown to stop the script
        throw new Error();
    }
}
