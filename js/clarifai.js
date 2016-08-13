var currentSearchTerm = '';
var currentImgUrls = [];

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
        if (imgResult.tag.classes.indexOf(currentSearchTerm) == -1) {
            imgUrls.push(response.results[i].url);
        }
    }
    currentImgUrls = imgUrls;
};

function handleError(err){
    console.log(err);
};

function getCurrentImgUrls() {
  return currentImgUrls;
}
