function redditRetrieve(sub) {
  var promise = $.ajax({
    url: "https://www.reddit.com/r/" + sub + ".json",
    type: 'get'
  })
  return promise
}

function callSubreddit(subreddit) {
  redditRetrieve(subreddit).then(function(r) {

    var requiredData = r.data.children.map(function(each) {
      var archivedStatus = each.data.archived ? "Archived" : "Not Archived";
      var requiredDataObject = {
        author: each.data.author,
        comments:each.data.num_comments,
        title: each.data.title,
        url: each.data.url,
        text: each.data.selftext,
        archivedStatus: archivedStatus
      }
//console.log(requiredDataObject)
     return requiredDataObject
    });
    var templateSource = $('#reddit-list-template').html();
    var template = Handlebars.compile(templateSource);
    var html = template(requiredData);
    $('.reddit-list').html(html);

    toggleDescription()

  }, function() {
    $('.reddit-list').html("<h2 class='text-center no-result'>No such sub-reddit, please search again</h2>");
  })
}



$('#button').click(function() {
  var subreddit = $('#box').val().toLowerCase();
  callSubreddit(subreddit);
})

$('#box').keydown(function(e){
  if(e.which === 13){
   $('#button').click();
    return false
  }
})

function toggleDescription(){
  $('.display-button').click(function(){
      $(this).next('.text').toggle()
    })
}