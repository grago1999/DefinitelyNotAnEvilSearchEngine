var authId = btoa(':7oc2w5VV/beWzXSDzhB3dpk6CDHSH7lD/5z82UH84Us:');

function getSiteData(searchTerm, index) {
  $.ajax({
      method: 'post',
      url: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27'+searchTerm+'%27&$skip='+index,
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + authId
      },
      success: function(data) {
          var results = data.d.results;
          if (results.length > 8) {
            var resultsHTML = '';
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var div = '<div>'+result.Title+' '+result.Url+'</div>';
                resultsHTML += div;
            }
            $('#results').html(resultsHTML);
          } else {
            if(index == 0) {
              getSiteData(searchTerm, getRandomInt(1, 100));
            } else {
              if (index == 1000) {
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
