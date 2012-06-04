function checkBookMarkItem() {
    console.log(">>>>>>> Inside checkBookMarkItem")
    var docID = ""
    var sectionType = ""
    $(".bookmark").click(function () {
        alert(">>>>>> Inside bookmark click")
        docID = $(this).attr("docID")
        sectionType = $(this).attr("sectionType")
        alert("DocID : " + docID + ", sectionType : " + sectionType)

    })
    $(".bookmark_active").click(function () {
        alert(">>>>>> Inside bookmark_active click")
        docID = $(this).attr("docID")
        sectionType = $(this).attr("sectionType")
        alert("DocID : " + docID + ", sectionType : " + sectionType)

    })
}


function closeMenu() {
    console.log(">>>>>>>>>> Inside closeMenu")
    if (isMenuOpen) {
        hideMenu();
        isMenuOpen = false;
    }
}
