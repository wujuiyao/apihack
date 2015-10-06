$(document).ready(function(){

  //Event Listeners
  $('.lp-search').submit(function(event){
    // zero out results if previous search has run
    $('.search-title').html('');
    var artist = $(this).find('input[name="vinyl"]').val();
    showSearchTitle(artist);

    getResult(artist);
  });
  //Functions
  function showSearchTitle(artist){
    console.log(artist);
    $('.search-title').html(artist);
  }

  var getResult = function(data){
    var baseUrl = "https://api.discogs.com/";
    var personalToken = 'rYmnwpDTRWMThtDZpBVvBjgbovfzmlhoXBMxWUbf';
    //artistSearchUrl
    var searchUrl = baseUrl + 'database/search?q=' + data + '&per_page=100&page=1&token=' + personalToken;

    $.ajax({
      data: data,
      dataType: "JSONP",
      type: "GET",
      url: searchUrl
    })
    .done(function(data){
      console.log(data);
    });
  };

});
