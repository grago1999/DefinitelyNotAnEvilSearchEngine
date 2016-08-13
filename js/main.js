
var SEARCH_TEXT;

var suggest = function(current_text){
  SEARCH_TEXT = current_text;
};

var search = function(){
  if(SEARCH_TEXT) {
    document.location.href = 'search.html?search='+SEARCH_TEXT;
  }
}
