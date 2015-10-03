$(document).ready(function(){

  //Search Input
  $('.lp-search').submit(function(event){
    // zero out results if previous search has run
    $('.search-title').html('');
    var artist = $(this).find('input[name="vinyl"]').val();
    showSearchTitle(artist);

    getResult(artist);
  });

  function showSearchTitle(artist){
    console.log(artist);
    $('.search-title').html(artist);
  }

  var getResult = function(data){
    var baseUrl = "https://api.discogs.com/";
    //artistSearchUrl
    var artistUrl = baseUrl + 'artists/' + data;

    $.ajax({
      data: data,
      dataType: "JSONP",
      type: "GET",
      url: artistUrl
    })
    .done(function(data){
      console.log(data);
    });
  };

});
