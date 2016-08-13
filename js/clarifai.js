var currentSearchTerm = '';

function setupClarifai() {
    Clarifai.initialize({
        'clientId': '6Zft-9_A4IiRuEpbfX-8-1V-egHAqvAASUhiB3et',
        'clientSecret': '3pBTJ-olpw3gvJXw1rVRZvh84QllYkVaUFFwuPw0'
    });
};

function getImgTags(imgUrls, searchTerm) {
    currentSearchTerm = searchTerm;
    Clarifai.getTagsByUrl(imgUrls).then(
        handleResponse,
        handleError
    );
};

function handleResponse(response){
    var imgUrls = [];
    for (var i = 0; i < response.results.length; i++) {
        var imgResult = response.results[i].result
        var canUseImg = true;
        for (var j = 0; j < imgResult.tag.classes.length; j++) {
            var currentClass = imgResult.tag.classes[j];
            if (currentClass == currentSearchTerm) {
                canUseImg = false;
                break;
            }
        }
        if (canUseImg) {
            imgUrls.push(response.results[i].url);
        }
    }
    displayImgs(imgUrls);
};

function handleError(err){
    console.log(err);
};

function displayImgs(imgUrls) {
    console.log('a');
    console.log(imgUrls);
};
