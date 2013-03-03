
var ranked = false;

var items = [
    {
      "f_name": "Giannino",
      "l_name": "Uberto",
      "id": 3,
      "rank": 0
      // rank: to be determined
    },
    {
      "f_name": "Augustinus",
      "l_name": "Filibert",
      "id": 5,
      "rank": 0
    },
    {
      "f_name": "Raoul",
      "l_name": "Willifrid",
      "id": 13,
      "rank": 0
    },
    {
      "f_name": "Stanimir",
      "l_name": "Akim",
      "id": 43,
      "rank": 0
    },
    {
      "f_name": "Maya",
      "l_name": "Fletcher",
      "id": 4,
      "rank": 0
    },
    {
      "f_name": "Kyle",
      "l_name": "Williamson",
      "id": 11,
      "rank": 0
    },
    {
      "f_name": "Millie",
      "l_name": "Naylor",
      "id": 59,
      "rank": 0
    },
    {
      "f_name": "Georgia",
      "l_name": "Howell",
      "id": 9,
      "rank": 0
    },
    {
      "f_name": "Alexandra",
      "l_name": "Cole",
      "id": 71,
      "rank": 0
    }
];

window.onload = display_results;

function rank_display_results(){

  var user_input = $('#inputbox').val();

  if (user_input === ""){
    ranked = false;

  } else {
    // get item scores for every item and store them in item_scores
    var full_name = "";
    for (var i = 0; i < items.length; i+=1){
      full_name = items[i].f_name + ' ' + items[i].l_name;
      items[i].rank = full_name.score(user_input);
    }
    sortResults('rank', false);
    ranked = true;
  }

  display_results();
}

function display_results(){
  // here we dont care about the rank, display results in their order
  var full_name = "";
  var child_count = 0;
  $('#itemsdiv').empty();

  // if string score was performed
  if (ranked){

    for (var i = 0; i < items.length; i+=1){
      full_name = items[i].f_name + ' ' + items[i].l_name;

      if (items[i].rank > 0){
        $('#itemsdiv').append('<input type="checkbox" value="chkbx_' +
          items[i].id + '">' + full_name + /*': ' + items[i].rank +*/ '</input><br/>');
        child_count += 1;
      }
    }

  // if string score was NOT performed
  } else {

    sortResults('f_name', true);

    for (var i = 0; i < items.length; i++){
      full_name = items[i].f_name + ' ' + items[i].l_name;
      $('#itemsdiv').append('<input type="checkbox" value="chkbx_' +
        items[i].id + '">' + full_name + /*': ' + items[i].rank +*/ '</input><br/>');
      child_count += 1;
    }
  }

  // display sorry not found message if there are no results
  if (child_count === 0) {
    $('#itemsdiv').append('<b>sorry, not found</b><br />');
  }
}

// taken from
// http://stackoverflow.com/questions/881510/jquery-sorting-json-by-properties
function sortResults(prop, asc) {
    items = items.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
}



