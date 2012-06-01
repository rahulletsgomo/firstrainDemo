/**
 * Child browser helper.
 * Opens up a childbrowser link within the application.
 * Options success & error callback (if the childbrowser object needs to be monitored)
 * options;{
 *            url:"string",
 *            location_change:callback,
 *            location_change_params: comma separated values (string) (NOT recommended)
 *            on_close:callback,
 *            on_external:callback
 *          }
 */

//Store all PG related objects here
App.phoneGap = App.phoneGap || {};
App.phoneGap.delayChildBrowser = false; // this is a temp patch till childbrowser pulgin is fixed(crashes webiew on multiple calls)
App.phoneGap.delayChildBrowserBy = 4400; // this is a temp timer which will prevent a call to childbrowser by the amount mentioned when CB is called really quickly

//App.phoneGap.childBrowser will hold the instantiated object

var PG_childBrowser = function (options) {
    alert("Inside child : " + options.url)

    if (App.phoneGap.delayChildBrowser) {
        return false;
    }
    App.phoneGap.delayChildBrowser = true; // since this has been called once, create artificial delay till next call
    setTimeout(function () {
        App.phoneGap.delayChildBrowser = false;
    }, App.phoneGap.delayChildBrowserBy);


    var url, //holds the url to be opened
        onCbLocChange, // function thats called when url changes in cb
        onCbLocChangeParams, // function thats called when url changes in cb
        onCbClose, // function thats called when the child browser closes,
        onCbExternal;
    // function called when safari is invoked from CB

    //Set options hash correctly
    if (!options) {
        var options = {}
    }
    url = options.url || App.settings.server;
    onCbLocChange = options.location_change || function () {
    };
    onCbLocChangeParams = options.location_change_params || false;
    onCbClose = options.on_close || function () {
    };
    onCbExternal = options.on_external || function () {
    };
    //Install CB if needed
    if ((navigator.userAgent).toLowerCase().indexOf('android') != -1) {
        //Android Items
    }
    else if (!App.phoneGap.childBrowser) {
        //Install for iOS
        App.phoneGap.childBrowser = ChildBrowser.install();
    }

    if ((navigator.userAgent).toLowerCase().indexOf('android') != -1) {
        //Android Items
        window.plugins.childBrowser.showWebPage(url, { showLocationBar:false }); // This prevents the issue with lost focus
        window.plugins.childBrowser.onClose = onCbClose;
        window.plugins.childBrowser.onLocationChange = function (loc) {
            if (onCbLocChangeParams) {
                onCbLocChange(loc, onCbLocChangeParams)
            }
            else {
                onCbLocChange(loc)
            }
        }
    }
    else if (App.phoneGap.childBrowser != null) {
        // open & link CB for iOS
        App.phoneGap.childBrowser.onLocationChange = function (loc) {
            if (onCbLocChangeParams) {
                onCbLocChange(loc, onCbLocChangeParams)
            }
            else {
                onCbLocChange(loc);
            }

        };
        App.phoneGap.childBrowser.onClose = onCbClose;
        App.phoneGap.childBrowser.onOpenExternal = onCbExternal;
        window.plugins.childBrowser.showWebPage(url);
    }
    return this;
}

var PG_childBrowserClose = function () {
    if ((navigator.userAgent).toLowerCase().indexOf('android') != -1) {
        window.plugins.childBrowser.close();
    }
    else if (App.phoneGap.childBrowser) {
        App.phoneGap.childBrowser.close();
    }
}
