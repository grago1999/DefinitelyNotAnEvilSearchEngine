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
                    resultsHTML += "<div><h3 style= '-webkit-margin-start: 100px; -webkit-margin-before: 0.5em; -webkit-margin-after: 0.5em;'><a href='"+result.Url+"'>"+result.Title+"</a></h3><p style= '-webkit-margin-start: 100px; -webkit-margin-before: 0em; -webkit-margin-after: 0em;'>"+result.DisplayUrl+"</p><p style= '-webkit-margin-start: 100px; -webkit-margin-before: 0em; -webkit-margin-after: 0em;'>"+result.Description+"</p></div>";
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
              for (var i = 0; i < results.length; i++) {
                  imgUrls.push(results[i].MediaUrl);
              }
              getImgTags(imgUrls, results);
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
          for (var i = 0; i < results.length; i++) {
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

function useSuggestion(text) {
    document.getElementById("search").value = text;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
