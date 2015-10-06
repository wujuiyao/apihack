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

  var showSearchResults = function(query, resultNum) {
	  var results = resultNum + ' results for <strong>' + query;
	  return results;
  };

  var getResult = function(data){
    var baseUrl = "https://api.discogs.com/";
    var personalToken = 'rYmnwpDTRWMThtDZpBVvBjgbovfzmlhoXBMxWUbf';

    //SearchUrl
    var searchUrl = baseUrl + 'database/search?q=' + data + '&release_title=' + data + '&per_page=20&page=1&token=' + personalToken;

    $.ajax({
      url: searchUrl,
      type: 'GET',
      dataType: 'JSONP'
    })
    .done(function(result){
      console.log(result);

      var test = result.data.results[0].title;
      console.log(test);
    });
  };

});
