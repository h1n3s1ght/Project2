//============
//        Index 
//============
//        Scripts
//============
    //Password Verification
    //================
    // Make Submit Visible and Verification Hidden
    // =================================
function hideAndSeek() {
    $("#verifyPassword").fadeOut(200);
    $("#verifySubmit").fadeIn(200);
}

function verifyPass() {
  let pass1 = document.getElementById("password").value;
  let pass2 = document.getElementById("password2").value;
  if (pass1.length >= 4 && pass1.length <= 15) {
    if (pass1 != pass2) {
      alert("Passwords did not match. Please correct this before submitting.");
    } else {
      hideAndSeek();
    }
  } else {
    alert("Password must be between 4 and 15 characters.");
  }
}

//============
//       AJAX 
//============
//        Scripts
//============

  //Variables
  //=======
let giveLocation;
let daysOfTrip;
let eachDate = [];
const settings = {
  async: true,
  crossDomain: true,
  url: `http://api.weatherapi.com/v1/future.json?key=5095991527d84088b02205950220905`+`&q=`+`${giveLocation}`+`&dt=`+`${eachDate}`,
  method: "GET",
  headers: {
    "weather API Key": "5095991527d84088b02205950220905",
  },
  };

for (let ajax = 0; ajax <= daysOfTrip; ajax++){
  //Call AJAX
  //========
$.ajax(settings).done(function (response) {
  console.log("Weather is in now.");
})}

//============
//     Dashboard 
//============
//       Scripts
//============
  // Script for new locations to be added or 
  // deleted based on the button selected
  //=============================
  let updateNow = {};
  let checkedLocations = {};
  function addLocation(){
    updateNow = user.locations;
       updateNow.push($("input[name=locations]").val());
      $("input[name=locations]").val() = user.locations;
  }

  // Delete Selected Elements in
  // the div .oneLocation if checked
  //=======================
function getSelect(){
  selectedLocations = [];
  let sendingInfo = $("input:text[name=selectedLocations]");
  $("input:checkbox[name=byeBye]:checked").each(function(){
    selectedLocations.push($(this).val());
});
sendingInfo.attr("value", selectedLocations);
console.log(selectedLocations);
};

//============
//    New User 
//============
//      Scripts
//============
    //All but the first Div hidden at
    //the load of the screen
    //==================

    //Filter through Questions
    //=================
  var next = 1;
function nextQuestion() {
    if(next < 5){
        $(`div .${next}`).fadeOut(200);
        $(`div .${next + 1}`).fadeIn(200);
        next++;
    } else {
        return;
    }
}

function prevQuestion() {
    if (next > 1){
        $(`div .${next}`).fadeOut(200);
        $(`div .${next - 1}`).fadeIn(200);
        next--;
    } else {
        return;
    }
}
    //=================
    //Setup the map element
    //=================

    //===============
    // From Google Maps
    //===============
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0060},
    zoom: 10,
  });
  initAutocomplete();
}

// //Update map to be called later
// //=====================
// function updateMap(){
//     map = google.maps.Map(document.getElementById('map'), {
//     center: {lat: `${newPlace.geometry.location.lat}`, lng:`${newPlace.geometry.location.lng}`},
//     })
//     }

// function convertNewPlace(){
// }

var autocomplete;
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            types: ["locality"],
            componentRestrictions: {'country': ['US']},
            fields: ['geometry', 'place_id', 'name']
        });
        autocomplete.addListener('place_changed', onPlaceChanged);
}
 let newPlace;
function onPlaceChanged(){
    newPlace = autocomplete.getPlace();
    if(!newPlace.geometry){
        document.getElementById('autocomplete').placeholder = 'Enter a locality';
    } else {
        document.getElementById('mapInput').innerHTML = newPlace.name;
        // console.log(newPlace.geometry.location.lat);
        // console.log(newPlace.geometry.location.lng);
        // updateMap();
    }}

    google.maps.event.addDomListener(window, 'load', initMap);