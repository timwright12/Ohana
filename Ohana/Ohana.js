/* support for indexOf in IE8 and below */

if (!Array.indexOf) {

  Array.prototype.indexOf = function (obj, start) {

    'use strict';

    var len = this.length,
        i;

    for (i = (start || 0); i < len; i = i + 1) {

      if (this[i] === obj) {

        return i;

      }
    }

    return -1;
  };

} // end indexOf
/* console in unsupported browsers */

if (console.log === 'undefined') {

  // if console.log is undefined, manually build the log object so it doesn't error out
  var console = {
    log: function () {

       // nothing here, just making sure there's no error thrown
      'use strict';

    }
  };
  
} // end console

;(function ($, w, doc) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var Ohana = {};

  // Namespace
  Ohana.NS = "Ohana";
  Ohana.VERSION = "0.0.1";

  /*
    Initialization Method
  */

  // Start defining methods here
  Ohana.Init = function() {
    
    // load Handlebars for templating
    Ohana.Load('Ohana/vendor/handlebars.js', function() {
      console.log(Handlebars.VERSION);
    });
  
  }; // Init


  Ohana.Get = function ( url, callback ) {
    
  } // Get

  Ohana.Module = function( name ) {

  }; // Module
  

  Ohana.Template = function( name ) {

  }; // Template
  

  Ohana.Data = function( src ) {

  }; // Data
  

  Ohana.Include = function( path ) {

  }; // Include


  /*
    LocalStorage with Cookie fallback
  */
  
  Ohana.Store = function ( namespace, data ) {
    
    var store,
        results;
  
    if (FTS.localStorageSupported() && JSON) {
  
      // use localStorage if supported
      if (arguments.length > 1) {
  
        results = localStorage.setItem(namespace, JSON.stringify(data));
  
      } else {
  
        store = localStorage.getItem(namespace);
        results = (store && JSON.parse(store)) || [];
  
      }
  
    } else {
  
      // otherwise, store data in a cookie
      if (arguments.length > 1) {
  
        results = FTS.setCookie(namespace, data);
  
      } else {
  
        store = FTS.getCookie(namespace);
        results = (store) || [];
  
      }
  
    }
  
    return results;
    
  }; // Store
  
  
  /*
    Load JS Asynchronously
  */
  
  Ohana.Load = function( path, callback ) {
  
    var script = document.createElement('script');
    
    Ohana.On(script, 'load', function(){
        
        if (typeof(callback) === 'function') {
            callback.call(this);
        }
        
    });
  
    script.src = path;
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
    
  }; // Load
  
  
  /*
    Event binding polyfill: On
  */
  
  Ohana.On = function ( el, eventName, eventHandler ) {
  
    if ( el.addEventListener ) {
    
      // normal event listener
      el.addEventListener(eventName, eventHandler, false); 
    
    } else if ( el.attachEvent ) {
      
      // fallback support for IE8 and below
      el.attachEvent('on' + eventName, eventHandler);
      
    }
  
  }; // On
  
  
  /*
    Event binding polyfill: Off
  */
  
  Ohana.Off = function ( el, eventName, eventHandler ) {
    
   if (el.removeEventListener) {
        
        // normal event listener
        el.removeEventListener(eventName, eventHandler, false);
        
    } else if (el.detachEvent) {
    
        // fallback support for IE8 and below
        el.detachEvent('on' + eventName, eventHandler);
    
    }
    
  }; // Off

  /*
    Start Ohana
  */
  
  Ohana.Init();

} )( jQuery, this, this.document );