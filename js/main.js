
var SEARCH_TEXT;

var suggest = function(el){
  if (event.keyCode == 13) {
      search();
  } else {
    SEARCH_TEXT = el.value;
  }
};

var search = function(){
  if(SEARCH_TEXT) {
    document.location.href = 'search.html?search='+SEARCH_TEXT;
  }
}
