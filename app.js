$(document).ready(function(){

  //Event Listeners
  $('.lp-search').submit(function(event){
    // zero out results if previous search has run
    $('.search-title').html('');
    var artist = $(this).find('input[name="vinyl"]').val();
    getResult(artist);
  });

  //Functions
  // takes error string and turns it into displayable DOM element
  var showError = function(error){
    var errorElem = $('.templates .error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
  };
  /*Query Function*/
  var showSearchResults = function(query, resultNum) {
	  var results = resultNum + ' Results for <strong>' + query;
	  return results;
  };

  var showSearch = function(artist){
    var search = $('.templates .artist-search').clone();
    var inputSearch = search.find('.artist-title');
    inputSearch.text(artist.title);
  };

  var getResult = function(data){
    var baseUrl = "https://api.discogs.com/";
    var personalToken = 'rYmnwpDTRWMThtDZpBVvBjgbovfzmlhoXBMxWUbf';

    //SearchUrl
    var searchUrl = baseUrl + 'database/search?q=' + data + '&per_page=20&page=1&token=' + personalToken;

    $.ajax({
      url: searchUrl,
      type: 'GET',
      dataType: 'JSONP'
    })
    .done(function(result){
      console.log(result);

      var searchResults = showSearchResults(data, result.data.results.length);
		  $('.search-title').html(searchResults);

      var obExtension = result.data.results;

      $.each(obExtension, function(index, item){
        var showAllResults = showSearch(item);
        $('.templates').append(showAllResults);
       })
    })


    // find a way to test the fail function -- later test -- just input a wrong website link
    .fail(function(error){
      var errorElem = showError(error);
  		$('.search-title').append(errorElem);
    });
  };

});
