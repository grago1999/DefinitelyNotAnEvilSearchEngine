
var SEARCH_TEXT;

var suggest = function(el){
  if (event.keyCode == 13) {
      search();
  } else {
      SEARCH_TEXT = el.value;
      getSearchSuggestions(SEARCH_TEXT);
  }
};

var search = function(){
  if(SEARCH_TEXT) {
    document.location.href = 'search.html?search='+SEARCH_TEXT;
  }
}

function showWeb() {
    $("#results").show();
    $("#imgResults").hide();
}

function showImgs() {
    $("#results").hide();
    $("#imgResults").show();
    var imgUrls = getCurrentImgUrls();
    if (imgUrls.length > 0) {
        displayImgs(imgUrls);
    }
}
var get_width = function(){
  $("#search").width();
  console.log($("#search").width());
}
