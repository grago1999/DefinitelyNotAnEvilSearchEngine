var searchId = btoa(':EIvUOUMRasUgnnrCSnmpctLpmbb2l8+fZHjZJjlBZB0:');
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
                    resultsHTML += "<div class='webResult' style= '-webkit-margin-start: 100px; -webkit-margin-before: 0.5em; -webkit-margin-after: 0.5em;'><h3><a href='"+result.Url+"' class='webLink closeIn'>"+result.Title+"</a></h3><p class='closeIn outLink'>"+result.DisplayUrl+"</p><p>"+result.Description+"</p></div>";
                }
            }
            $('#results').html(resultsHTML);
            getImgData(searchTerm, 10000);
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

function getImgData(searchTerm, index) {
  $.ajax({
      method: 'post',
      url: 'https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27'+searchTerm+'%27&$skip='+index,
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + searchId
      },
      success: function(data) {
          var results = data.d.results;
          if (results.length > 8) {
              var imgUrls = [];
              for (var i = 0; i < results.length && i < 40; i++) {
                  if(results[i].FileSize < 10485759) {
                      imgUrls.push(results[i].MediaUrl);
                  }
              }
              getImgTags(imgUrls, searchTerm);
          } else {
              if (index == 0) {
                  getImgData(searchTerm, getRandomInt(1, 100));
              } else {
                  if (index == 100) {
                      getImgData(searchTerm, index-100);
                  } else {
                      getImgData(searchTerm, index-1000);
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
          for (var i = 0; i < results.length && i < 5; i++) {
              var suggestion = results[i];
              if (!suggestion.includes(' ')) {
                  resultsHTML += "<div><button onclick=useSuggestion(\'"+suggestion+"\')>"+results[i]+"</button></div>";
              }
          }
          $('#suggestions').html(resultsHTML);
      },
      failure: function(err) {
          console.error(err);
      }
  });
}

function displayImgs(imgsUrls) {
    var resultsHTML = '';
    for (var i = 0; i < imgsUrls.length; i++) {
        resultsHTML += "<img class='searchImg' src="+imgsUrls[i]+">";
    }
    $('#imgResults').html(resultsHTML);
};

function useSuggestion(text) {
    document.getElementById("search").value = text;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
