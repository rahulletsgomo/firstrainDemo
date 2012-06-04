var landingPageScroll;
var documentDetailsScroll;

function loaded() {
    var wrapperWidth = $("#homePage").css("width").split("px", 1);
    if (version == "desktopWidget") {
        wrapperWidth -= 45;
    }
    else {
        wrapperWidth -= 30;
    }
    $("#scroller").css("width", ($("ul#thelist").children().length * wrapperWidth) + "px");
    configureIScroll(wrapperWidth)
    landingPageScroll = new iScroll('wrapper', {
        snap:true,
        momentum:false,
        hScrollbar:false,
        vScroll:false,
        snapThreshold:100,
        onScrollEnd:function () {
            getCurrentPage = this.currPageX
            $("#currentDoc").html(getCurrentPage + 1)
        }
    });
}
//        document.addEventListener('DOMContentLoaded', loaded, false);

function configureIScroll(wrapperWidth) {
    $("#scroller li").css("width", wrapperWidth + "px");
    $("#wrapper").css("width", wrapperWidth + "px");
    var docTitleWidth = wrapperWidth - 50;
    $("#docTitle").css("width", docTitleWidth + "px");
    var docSummary = wrapperWidth - 40;
    $("#docSummary").css("width", docSummary + "px");
}


function scrollDocumentDetails(container, wrapper, scroller) {
    console.log(">>>>> Inside scroll Document Details")
    var containerWidth = $(container).css("width");
    var containerHeight = $(container).css("height");
    $(wrapper).css("width", containerWidth)
    $(scroller).css("width", containerWidth)
    $(wrapper).css("height", containerHeight)

    documentDetailsScroll = new iScroll('documentDetailsWrapper', {
        vScrollbar:true,
        hScroll:false,
        momentum:true
    });
}


