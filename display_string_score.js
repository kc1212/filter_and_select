
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
      if (items[i].rank > 0 && items[i].checked === false){
        populate_item(i);
        child_count += 1;
      }
    }

  // if string score was NOT performed
  } else {
    sortResults('f_name', true);
    for (i = 0; i < items.length; i+=1){
      if (items[i].checked === false) {
        populate_item(i);
        child_count += 1;
      }
    }
  }

  // display sorry not found message if there are no results
  if (child_count === 0) {
    $('#itemsdiv')
      .append('<b>sorry, not found</b><br />')
      .hide().fadeIn(300);
  }
}

function populate_item(i){

  // need to match with #itemsdiv child
  var selector = 'a[id="chkbox_' + i + '"]';

  full_name = items[i].f_name + ' ' + items[i].l_name;
  // $('#itemsdiv').append('<input type="checkbox" id="chkbox_' +
  //   i + '" onclick="checkbox_action(' + i + ')">' + full_name + '</input><br/>');
  $('#itemsdiv')
    .append('<div id="notselected_' + i + '"><a href="#" onclick="add_action(' + i + ')">(+)</a> ' + full_name + '<br/></div>');
    // .hide().fadeIn(300);

  // // check the checked JSON attribute 
  // if (items[i].checked === true){
  //   $(selector).attr('checked', true);
  //   // console.log('update_checkbox: checked!');
  // } else {
  //   $(selector).attr('checked', false);
  //   // console.log('update_checkbox: not checked!');
  // }
}

function add_action(i){

  full_name = items[i].f_name + ' ' + items[i].l_name;

  // need to match with #itemsdiv child
  if (items[i].checked === false){
    items[i].checked = true;
    $('#selected')
      .append('<div id=selected_' + items[i].id + '><a href="#" onclick="del_action(' + items[i].id + ');">(-)</a>' + full_name + '</div>');
      // .hide().fadeIn(300);
  } else {
    console.log('add_action: error!');
  }

  $('#notselected_' + i).fadeOut("normal", function(){ $(this).remove(); });
  // items[i].checked = $('input[id="chkbox_' + i + '"]').is(':checked') ? true : false;
}

function del_action(id){

  // the i here is the id attribute
  for (var i = 0; i < items.length; i+=1){
    if (items[i].id === id){
      items[i].checked = false;
    }
  }
  $('#selected_' + id).fadeOut("normal", function(){ $(this).remove(); });

  rank_display_results();

}

// taken from
// http://stackoverflow.com/questions/881510/jquery-sorting-json-by-properties
function sortResults(prop, asc) {
    items = items.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
}


