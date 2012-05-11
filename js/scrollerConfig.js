var myScroll;
function loaded() {
    var wrapperWidth = $("#homePage").css("width").split("px", 1);
    wrapperWidth -= 30;
    $("#scroller").css("width", ($("ul#thelist").children().length * wrapperWidth) + "px");
    configureIScroll(wrapperWidth)
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

function configureIScroll(wrapperWidth){
    $("#scroller li").css("width",wrapperWidth+"px");
    $("#wrapper").css("width",wrapperWidth+"px");

}
