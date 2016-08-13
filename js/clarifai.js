var currentImgResults = [];

function setupClarifai() {
    Clarifai.initialize({
        'clientId': '6Zft-9_A4IiRuEpbfX-8-1V-egHAqvAASUhiB3et',
        'clientSecret': '3pBTJ-olpw3gvJXw1rVRZvh84QllYkVaUFFwuPw0'
    });
}

function getImgTags(imgUrls, imgResults) {
  currentImgResults = imgResults;
  Clarifai.getTagsByUrl(imgUrls).then(
        handleResponse,
        handleError
    );
}

function handleResponse(response){
    for (var i = 0; i < response.results.length; i++) {
        var imgResult = response.results[i].result
        for (var j = 0; j < imgResult.tag.classes.length; j++) {
            var currentClass = imgResults.classes[j];

        }
    }
};

function handleError(err){
    console.log(err);
};
