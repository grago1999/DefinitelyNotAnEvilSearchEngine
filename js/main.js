
var SEARCH_TEXT;

var suggest = function(current_text){
  SEARCH_TEXT = current_text;
};
var search = function(){
  $(location).attr('href', 'search.html');
};
