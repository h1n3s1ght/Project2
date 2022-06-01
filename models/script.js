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
    $(`div .${next}`).fadeOut(1000);
    $(`div .${next + 1}`).fadeIn(2000);
    next++;
}

function prevQuestion() {
     $(`div .${next}`).fadeOut(200);
    $(`div .${next - 1}`).fadeIn(200);
    next--;
}

    //Setup the map element
    //=================
