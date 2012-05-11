var myScroll;
function loaded() {
    var getCurrentPage = "";
    $("#scroller").css("width", ($("ul#thelist").children().length * 290) + "px");
    myScroll = new iScroll('wrapper', {
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

