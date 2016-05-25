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
      
      var params = Ohana.getUrlParameters( w.location );

      if ( params.page ) {
        
        Ohana.Page( params.page );
        
      } else if ( params.module ) {
        
        Ohana.page( params.module );
        
      } else {
        
        // load index
        
      }
      
    });
  
  }; // Init


  Ohana.Get = function ( url, callback ) {
    
  } // Get

  Ohana.Module = function( name ) {

  }; // Module
  

  Ohana.Template = function( name ) {

  }; // Template

  Ohana.Page = function( name ) {
    
    console.log(name);
    
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
    Get URL parameters
  */
  
  Ohana.getUrlParameters = function ( url ) {

    // initialize the array & variables
    var query_string = {},
        query,
        q,
        pair,
        arr,
        vars,
        varsLength,
        typeTest;
  
    // get current url if nothing passed in
    if (typeof url === 'undefined') {
  
      if (window.location.search !== '') {

        query = window.location.search;

      } else {

        return 'undefined';

      }
  
    }
  
    // check if the value is a string or a URL from the address bar
    if (typeof url === 'string') {
  
      query = url.split('?')[1];
  
    } else {
  
      query = url.search.substring(1);
  
    }
  
    // split the remaining string/object at the ampersands and dump them into an array
    vars = query.split('&');
    varsLength = vars.length;
  
    // loop through the array and push to a secondary array with key/value matching to access each object
    for (q = 0; q < varsLength; q = q + 1) {
  
      // split each pair at the = size
      pair = vars[q].split('=');
      typeTest = typeof (query_string[pair[0]]);

      if (typeTest === 'undefined') {

        query_string[pair[0]] = pair[1];

      } else if (typeTest === 'string') {

        arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;

      } else {

        // push the pairing into the query_string array
        query_string[pair[0]].push(pair[1]);

      }
  
    } // loop
  
    return query_string;

  };
  
  /*
    Start Ohana
  */
  
  Ohana.Init();

} )( jQuery, this, this.document );