function getSiteData() {
  $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/mralexgray/repos',
      data: { get_param: 'value' },
      dataType: 'json',
      success: function (data) {
          console.log(data);
      }
  });
}
