// Specify desired capacity in bytes
var desiredCapacity = 125 * 1024 * 1024;

// Create a 125MB key-value store
var storage = new LargeLocalStorage({size: desiredCapacity, name: 'myDb'});

// Await initialization of the storage area
storage.initialized.then(function (grantedCapacity) {
    // Check to see how much space the user authorized us to actually use.
    // Some browsers don't indicate how much space was granted in which case
    // grantedCapacity will be 1.
    if (grantedCapacity != -1 && grantedCapacity != desiredCapacity) {
    }
});

function FileStorage() {
}

FileStorage.save = function save(fileName, blob) {
    storage.setAttachment('myDoc', fileName, blob).then(function () {
        alert('finished setting the ' + fileName + ' attachment');
    });
}

FileStorage.remove = function remove(fileName) {

}

FileStorage.read = function read(filename) {
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if (isChrome) {
        storage.getAttachmentURL('myDoc', filename).then(function (url) {
            // do something with the attachment URL
            // ...
            window.location = url;
            // revoke the URL
            /* storage.revokeAttachmentURL(url);*/
        });
    } else {
        storage.getAttachment('myDoc', filename).then(function (file) {
            saveAs(file, filename);
        });
    }

}