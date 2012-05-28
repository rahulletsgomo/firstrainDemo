function monitorDetails(data) {
    var monitorSectionLength = data.data.sections.length;
    var monitorSection = data.data.sections;
    var monitorSectionResult = data.data.results;
    var monitorSectionType = "";
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
        frContent += '<ul><b>[' + i + '] ' + monitorSection[i].title + '</b>'
        var sectionBaseResultsLength = monitorSection[i].baseResults.length
        frContent += '<ol>'
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

            liOption += '<div class="liDiv">';
            liOption += isDocTweet ? '<div class="image">' + tweeterImage + '</div>' : "<div></div>"
            isDocTweet = false;
            liOption += docTitle ? '<div class="title">' + docTitle + '</div>' : '<div></div>';
            liOption += '<div class="date">' + referResultID + '<br />' + docDate + '</div>';
            liOption += docSource ? '<div class="source"><img src="' + docIcon + '" alt="Source Image" width=16 height=16 />&nbsp;&nbsp;' + docSource + '</div>' : '<div></div>';
            liOption += '</div>';

            frContent += '<li>' + liOption + '</li>'

            //Clear the previous variables before going to the next result
            docSource = ""
            docTitle = ""
            docIcon = ""
            liOption = ""

            referResultID++; //Move to the next result
        }

        //This will check for whether a has more button is required or not
        if (monitorSection[i].hasMore) {
            monitorSectionType = monitorSection[i].type;
            monitorSectionId = monitorSection[i].id;
            frContent += '<br /><button id="monitorDetails" type="' + monitorSectionType + '" monitorId="' + monitorId + '"sectionId = "' + monitorSectionId + '">Has More</button>'
        }
        frContent += '</ul>'
        frContent += '</ol>'
    }

    $("#container").html(frContent)
}
