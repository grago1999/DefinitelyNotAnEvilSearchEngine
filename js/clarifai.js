var currentSearchTerm = '';
var currentImgUrls = '';

function setupClarifai() {
    Clarifai.initialize({
        'clientId': 'OlhzAHUNfnalKVUMnnysT6QiNPl_FL8IoD4uUvhE',
        'clientSecret': 'x1hUmXuDgesxrdp_nUtGhkR4I_J42OIMRMrrQxTt'
    });
};

function getImgTags(imgUrls, searchTerm) {
    currentSearchTerm = searchTerm;
    Clarifai.getTagsByUrl(imgUrls[0]).then(
        handleResponse,
        handleError
    );
};

function handleResponse(response){
    var imgUrls = [];
    for (var i = 0; i < response.results.length; i++) {
        var imgResult = response.results[i].result
        if (!imgResult.error && imgResult.tag.classes.indexOf(currentSearchTerm) == -1) {
            imgUrls.push(response.results[i].url);
        }
    }
    currentImgUrls = imgUrls;
    displayImgs(imgUrls);
};

function handleError(err){
    console.log(err);
};

function getCurrentImgUrls() {
    return currentImgUrls;
};
