function monitorDetails(data) {
    var monitorSectionLength = data.data.sections.length;
    var monitorSection = data.data.sections;
    var monitorSectionResult = data.data.results;
    var monitorSectionType = "";
    var monitorSectionHeader = "";
    var monitorSectionId = "";
    var monitorId = data.data.monitor.id;
    var referResultID = 0;
    var liOption = "";
    var docSource;
    var docDate;
    var sectionResult;
    var tweeterImage;
    var docTitle;
    var docIcon;
    var isDocTweet = false;
    var frContent = "";

    for (var i = 0; i < monitorSectionLength; i++) {
        monitorSectionType = monitorSection[i].type
        monitorSectionHeader = getMonitorHeaderType(monitorSectionType);
        frContent += '<div class="item_header ' + monitorSectionHeader + '"><span>' + monitorSection[i].title + '</span></div>'
        frContent += '<div class="outer">'

        var sectionBaseResultsLength = monitorSection[i].baseResults.length
        console.log(">>>>>>>Type : " + monitorSection[i].type)

        frContent += '<div class="search_item">'
        for (var j = 0; j < sectionBaseResultsLength; j++) {
            sectionResult = monitorSectionResult[referResultID];

            docSource = (sectionResult.source) ? sectionResult.source : "";
            docTitle = (sectionResult.title) ? sectionResult.title : "";
            docIcon = (sectionResult.favicon) ? sectionResult.favicon : "";
            docDate = (sectionResult.timestamp) ? sectionResult.timestamp : "";
            docDate = (docDate != "") ? docDate.split(201, 1) : docDate;


            if (sectionResult.type == "TWEETS") {
                isDocTweet = true;
                tweeterImage = '<img src="' + sectionResult.extra.userImage + '" alt="Tweeter Image" />';
            }

            liOption += '<div class="search_item">'
            if ((monitorSectionType == "HIGHLIGHTS") || (monitorSectionType == "SEARCH")) {
                liOption += '<div class="bookmark">&nbsp;</div>'
            }
            liOption += '<div class="titlearea">'
            liOption += '<div class="title">' + docTitle + '</div>'
            if (docIcon == "") {
                liOption += '<div class="source">'

            }
            else {
                liOption += '<div class="source"><span class="favicon"><img src="' + docIcon + '" alt="Source Image" width=16 height=16 />&nbsp;&nbsp;</span>'
            }
            liOption += docSource
            liOption += '<span class="date">' + docDate + '</span>'
            liOption += '</div>'
            liOption += '</div>'
            liOption += '</div>'

            frContent += liOption

            //Clear the previous variables before going to the next result
            docSource = ""
            docTitle = ""
            docIcon = ""
            liOption = ""

            referResultID++; //Move to the next result
        }


        //This will check for whether a has more button is required or not
//        if (monitorSection[i].hasMore) {
//            monitorSectionType = monitorSection[i].type;
//            monitorSectionId = monitorSection[i].id;
//            frContent += '<br /><button id="monitorDetails" type="' + monitorSectionType + '" monitorId="' + monitorId + '"sectionId = "' + monitorSectionId + '">Has More</button>'
//        }


        frContent += '</div>'
        frContent += '</div>'
    }

    $(".container").html(frContent)
}

function getMonitorHeaderType(monitorSectionType) {
    var monitorSectionHeader;
    switch (monitorSectionType) {
        case 'TWEETS' :
            monitorSectionHeader = "tweet";
            break;
        case 'MANAGEMENT_TURNOVER':
            monitorSectionHeader = "green";
            break;
        case 'EVENTS':
            monitorSectionHeader = "green";
            break;
        default:
            monitorSectionHeader = "red";
            break;
    }

    return monitorSectionHeader;
}
