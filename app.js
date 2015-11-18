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
    var searchTitle = $('.templates .artist-search').clone();

    //Display the Artist Title
    var artistTitle = searchTitle.find('.artist-title');
    artistTitle.text(inputTag.title);
    //Display the Artist Thumbnail
    var artistThumb = searchTitle.find('.artist-thumb');
    var imageLink = inputTag.thumb;
    artistThumb.prepend('<img src="'+ imageLink + '" alt="">');
    //Display the Artist ID
    var artistId = searchTitle.find('.artist-id');
    artistId.prepend('<p>Discogs ID</p>' + inputTag.id);
    //Display the Artist Discogs Link Using a Button
    var artistLink = inputTag.uri;
    var artistUri = searchTitle.find('a .artist-uri');
    artistUri.attr('href', "http://www.discogs.com"+artistLink);

    return searchTitle;
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
        //index here is the number and item is the whole object itself
        console.log(index, item);
        var showAllResults = displaySearch(item);
        $('.results').append(showAllResults);
      });
    })

    .fail(function(errorResult){
      var errorElem = showError(errorResult);
  		$('.search-title').append(errorElem);
    });
  };

});
