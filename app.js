$(document).ready(function(){

$('.hash-getter').submit(function(event){
  // zero out results if previous search has run
  $('.search-title').html('');
  var tag = $(this).find('input[name="hashtag"]').val();
  console.log(tag);
});

var clientID = "155b290399484dd39e1dda80c3864fc1";
var clientSecret = "e9e28792ec2b4555be01a2222003a290";
var url = "https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=CLIENT-ID";

var mostLikedHash = $ajax({

});

});
