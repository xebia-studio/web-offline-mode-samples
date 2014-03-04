var synchronized = false;
var online = false;

$(document).ready(function () {

    // Check for the various File API support.
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
    }

    $.ajax({
        url: "http://www.thomas-guerin.com/assets/files.js",
        dataType: "jsonp",
        jsonpCallback: "callback",
        // work with the response
        success: function (response) {
            $.each(response, function (index, value) {
                $('#fileContainer').append('<li><a href="' + value.url + '">' + value.name + '</a></li>');
            });
            $('#fileContainer li a').each(function (index, linkData) {
                $(linkData).click(function(e){
                    e.preventDefault();
                    FileStorage.read($(linkData).text())
                });
            });
        }
    });

    $("#synchronize").click(function () {
        if (!synchronized) {
            $('#fileContainer li a').each(function (index, linkData) {
                downloadFile($(linkData).text(), $(linkData).attr("href"));
            });
        }
    });

});

function downloadFile(filename, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://www.thomas-guerin.com/assets/download.php?path=" + encodeURI(url));
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            FileStorage.save(filename, xhr.response);
        }
    };
    xhr.send(null);
}