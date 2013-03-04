
var ranked = false;

var items = [
    {
      "f_name": "Giannino",
      "l_name": "Uberto",
      "id": 3,
      "checked": false,
      "rank": 0
      // rank: to be determined
    },
    {
      "f_name": "Augustinus",
      "l_name": "Filibert",
      "id": 5,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Raoul",
      "l_name": "Willifrid",
      "id": 13,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Stanimir",
      "l_name": "Akim",
      "id": 43,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Maya",
      "l_name": "Fletcher",
      "id": 4,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Kyle",
      "l_name": "Williamson",
      "id": 11,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Millie",
      "l_name": "Naylor",
      "id": 59,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Georgia",
      "l_name": "Howell",
      "id": 9,
      "checked": false,
      "rank": 0
    },
    {
      "f_name": "Alexandra",
      "l_name": "Cole",
      "id": 71,
      "checked": false,
      "rank": 0
    }
];

window.onload = show_results;

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
    ranked = true;
  }

  show_results();
}


function show_results(){
  // here we dont care about the rank, display results in their order
  var full_name = "";
  var child_count = 0;
  var i = 0;
  $('#itemsdiv').empty();

  // if string score was performed
  if (ranked){
    sortResults('rank', false);
    for (i = 0; i < items.length; i+=1){
      if (items[i].rank > 0){
        update_checkbox(i);
        child_count += 1;
      }
    }

  // if string score was NOT performed
  } else {
    sortResults('f_name', true);
    for (i = 0; i < items.length; i+=1){
      update_checkbox(i);
      child_count += 1;
    }
  }

  // display sorry not found message if there are no results
  if (child_count === 0) {
    $('#itemsdiv').append('<b>sorry, not found</b><br />');
  }
}

function update_checkbox(i){

  var selector = 'input[id="chkbox_' + i + '"]';

  full_name = items[i].f_name + ' ' + items[i].l_name;
  $('#itemsdiv').append('<input type="checkbox" id="chkbox_' +
    i + '" onclick="checkbox_action(' + i + ')">' + full_name + '</input><br/>');

  // check the checked JSON attribute 
  if (items[i].checked === true){
    $(selector).attr('checked', true);
    // console.log('update_checkbox: checked!');
  } else {
    $(selector).attr('checked', false);
    // console.log('update_checkbox: not checked!');
  }
}

function checkbox_action(i){

  full_name = items[i].f_name + ' ' + items[i].l_name;
  if ($('input[id="chkbox_' + i + '"]').is(':checked')){
    items[i].checked = true;
    $('#selected').append('<span id=selected_' + items[i].id + '>' + full_name + ', </span>');
  } else {
    items[i].checked = false;
    $('#selected_' + items[i].id).remove();
    // console.log('action: unchecked!');
  }
  // items[i].checked = $('input[id="chkbox_' + i + '"]').is(':checked') ? true : false;
}

// taken from
// http://stackoverflow.com/questions/881510/jquery-sorting-json-by-properties
function sortResults(prop, asc) {
    items = items.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
}


