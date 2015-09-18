$(document).ready(function(){

  //variables
  var clientID = "155b290399484dd39e1dda80c3864fc1";

  /* Event Handlers */
  //Search Input
  $('.hash-getter').submit(function(event){
    // zero out results if previous search has run
    $('.search-title').html('');
    var tag = $(this).find('input[name="hashtag"]').val();
    showSearchTitle(tag);
    getResult(tag);
  });


  function showSearchTitle(tag){
    console.log(tag);
    $('.search-title').html(tag);
  }

  //get the auth right

  function getResult(tag){

    var result = $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url : 'https://api.instagram.com/v1/tags/tag/media/recent?client_id=155b290399484dd39e1dda80c3864fc1'
    })
    .done(function(result){
      console.log(result);
    });
  }

});
