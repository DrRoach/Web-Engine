<?php

//Check to see if REPORT_ERRORS has been defined, if not, set it
//to false by default.
if (!defined(REPORT_ERRORS)) {
    define('REPORT_ERRORS', false);
}

//Turn on error reporting if it has been set to true
if (REPORT_ERRORS == true) {
    error_reporting(E_ALL);
    ini_set('display_errors', true);

    echo '<script>var REPORT_ERRORS = true;</script>';
}

//Load the engine.css file
echo '<link rel="stylesheet" href="/engine/engine.css">';

//Load the engine.js file
echo '<script src="/engine/engine.js"></script>';

/**
 * Load all of the required scripts
 */
echo '<script src="/engine/screen/init.js"></script>';
