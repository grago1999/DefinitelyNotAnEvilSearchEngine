var searchId = btoa(':7oc2w5VV/beWzXSDzhB3dpk6CDHSH7lD/5z82UH84Us:');
var suggestId = btoa(':0e80b565052844069bdfe21798661438:');

function getSiteData(searchTerm, index) {
  $.ajax({
      method: 'post',
      url: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27'+searchTerm+'%27&$skip='+index,
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + searchId
      },
      success: function(data) {
          var results = data.d.results;
          if (results.length > 8) {
            var resultsHTML = '';
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if(result.Title !== '') {
                    resultsHTML += "<div><h3><a href='"+result.Url+"'>"+result.Title+"</a></h3><p>"+result.DisplayUrl+"</p><p>"+result.Description+"</p></div>";;
                }
            }
            $('#results').html(resultsHTML);
          } else {
              if(index == 0) {
                  getSiteData(searchTerm, getRandomInt(1, 100));
              } else {
                  if (index == 100) {
                      getSiteData(searchTerm, index-100);
                  } else {
                      getSiteData(searchTerm, index-1000);
                  }
              }
          }
      },
      failure: function(err) {
          console.error(err);
      }
  });
}

function getSearchSuggestions(searchTerm) {
  $.ajax({
      method: 'post',
      url: 'http://api.bing.com/osjson.aspx?query='+searchTerm,
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + suggestId
      },
      success: function(data) {
          var resultsHTML = '';
          var results = data[1];
          for (var i = 0; i < results.length; i++) {
              var id = 'suggestion'+i;
              resultsHTML += "<div><button id=''"+id+"' onclick='useSuggestion("+id+")'>"+results[i]+"</button></div>";
          }
          $('#suggestions').html(resultsHTML);
      },
      failure: function(err) {
          console.error(err);
      }
  });
}

function useSuggestion(el) {
  var elem = document.getElementById("myButton1");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
