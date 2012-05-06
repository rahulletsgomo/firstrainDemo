var myScroll;

function loaded() {
    alert("inside loaded function")
    var setWrapperWidth = $("body").css("width")
    alert("Width : "+setWrapperWidth)
    $("#wrapper").css("width", setWrapperWidth)
//    $("#scroller").css("width",($("ul#thelist").children().length * 300)+"px");

    myScroll = new iScroll('wrapper', {
        snap: true,
        snapThreshold: 50,
        momentum: false,
        hScrollbar: true,
        // checkDOMChanges:true

        onScrollEnd: function () {
            console.log(this.currPageX+1);
            //document.querySelector('#indicator > li.active').className = '';
            // document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }

    });
}

document.addEventListener('DOMContentLoaded', loaded, false);
