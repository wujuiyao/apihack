$(document).ready(function(){

  /*Event Listeners*/
  $('.lp-search').submit(function(event){
    // zero out results if previous search has run
    $('.results').html('');
    var artist = $(this).find('input[name="vinyl"]').val();
    getResult(artist);
  });

  /*Functions*/
  // takes error string and turns it into displayable DOM element
  var showError = function(error){
    var errorElem = $('.templates .error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
  };
  var showSearchResults = function(query, resultNum) {
	  var results = resultNum + ' Results for <strong>' + query;
	  return results;
  };
  var displaySearch = function(inputTag){
    var search = $('.templates .artist-search').clone();
    //Display the Artist Title
    var artistTitle = search.find('.artist-title');
    artistTitle.text(inputTag.title);

    return search;
  };
  /*JSON Function*/
  var getResult = function(data){
    var baseUrl = "https://api.discogs.com/";
    var personalToken = 'rYmnwpDTRWMThtDZpBVvBjgbovfzmlhoXBMxWUbf';
    var searchUrl = baseUrl + 'database/search?q=' + data + '&per_page=20&page=1&token=' + personalToken;

    $.ajax({
      url: searchUrl,
      type: 'GET',
      dataType: 'JSONP'
    })
    .done(function(result){
      console.log(result);
      //Display the user's search results
      var searchResults = showSearchResults(data, result.data.results.length);
		  $('.search-title').html(searchResults);
      //Display the details of each objects
      $.each(result.data.results, function(index, item){
        var showAllResults = displaySearch(item);
        $('.results').append(showAllResults);
      });
    })

    // find a way to test the fail function -- later test -- just input a wrong website link
    .fail(function(error){
      var errorElem = showError(error);
  		$('.search-title').append(errorElem);
    });
  };

});
