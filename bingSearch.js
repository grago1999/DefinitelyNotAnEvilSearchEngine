function getSiteData(searchTerm, index) {
  $.ajax({
      method: 'post',
      url: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27'+searchTerm+'%27&$skip=1000',
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + btoa(':7oc2w5VV/beWzXSDzhB3dpk6CDHSH7lD/5z82UH84Us:')
      },
      success: function (data) {
          if (data.d.results.length > 0) {
            console.log(data);
          } else {
            if (index == 1000) {
              getSiteData(index-100);
            } else {
              getSiteData(index-1000);
            }
          }
      },
      failure: function(err) {
          console.error(err);
      }
  });
}
