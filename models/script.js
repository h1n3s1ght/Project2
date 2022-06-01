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
  document.getElementById("verifySubmit").style.visibility = "visible";
  document.getElementById("verifyPassword").style.visibility = "hidden";
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

    //Setup the map element
    //=================

    //From Google Maps
    //==============

let autocomplete = new google.maps.places.Autocomplete(input, options);
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            types: ["locality"],
            componentRestrictions: {'country': ["US"]},
            fields: ['place_id', 'geometry', 'name']
        });
        autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged(){
    let newPlace = autocomplete.getPlace();
    if(!place.geometry){
        document.getElementById('autocomplete').placeholder = 'Enter a place'
    } else {
        document.getElementById('details').innerHTML = newPlace.name;
    }}

const center = { lat: 50.064192, lng: -130.605469 };
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};
const input = document.getElementById("pac-input");
const options = {
  bounds: defaultBounds,
  componentRestrictions: { country: "us" },
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
  types: ["establishment"],
};
