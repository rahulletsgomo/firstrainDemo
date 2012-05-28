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
    var sectionResultClass;
    var docTitle;
    var docIcon;
    var frContent = "";
    var tweeterImage = "";

    for (var i = 0; i < monitorSectionLength; i++) {
        monitorSectionType = monitorSection[i].type
        monitorSectionHeader = setMonitorHeaderType(monitorSectionType);
        if (monitorSectionType == "TWEETS") {
            frContent += '<div class="item_header tweet"><span class="tweeticon_bird"></span><span>FirstTweets</span></div>'
        }
        else {
            frContent += '<div class="item_header ' + monitorSectionHeader + '"><span>' + monitorSection[i].title + '</span></div>'
        }
        frContent += '<div class="outer">'

        var sectionBaseResultsLength = monitorSection[i].baseResults.length

        frContent += '<div class="search_item">'
        for (var j = 0; j < sectionBaseResultsLength; j++) {
            sectionResult = monitorSectionResult[referResultID];

            docSource = (sectionResult.source) ? sectionResult.source : "";
            docTitle = (sectionResult.title) ? sectionResult.title : "";
            docIcon = (sectionResult.favicon) ? sectionResult.favicon : "";
            docDate = (sectionResult.timestamp) ? sectionResult.timestamp : "";
            docDate = (docDate != "") ? docDate.split(201, 1) : docDate;


            sectionResultClass = (sectionResult.type == "TWEETS") ? "search_item_tweet" : "search_item"
            liOption += '<div class=' + sectionResultClass + '>'


            if ((monitorSectionType == "HIGHLIGHTS") || (monitorSectionType == "SEARCH")) {
                liOption += '<div class="bookmark">&nbsp;</div>'
            }

            if (sectionResult.type == "TWEETS") {
                tweeterImage = sectionResult.extra.userImage;
                liOption += '<div class="tweet_img"><img src="' + tweeterImage + '"></div>'
                liOption += '<div>' + docTitle + '</div>'
            }

            else {
                liOption += '<div class="titlearea">'
                liOption += '<div class="title">' + docTitle + '</div>'
                liOption += '<div class="source">'
                if (docIcon != "") {
                    liOption += '<span class="favicon"><img src="' + docIcon + '" alt="Source Image" width=16 height=16 />&nbsp;&nbsp;</span>'
                }
                liOption += docSource
                liOption += '<span class="date">' + docDate + '</span>'
                liOption += '</div>'
                liOption += '</div>'
            }
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

function setMonitorHeaderType(monitorSectionType) {
    var monitorSectionHeader;
    switch (monitorSectionType) {
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




