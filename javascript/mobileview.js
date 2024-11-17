// $(document).ready(function () {
//   // Add click event handlers to patient cards
//   $(".patient-card").click(function () {
//     // Show the patient details section
//     $("#patient-details").show();

//     // Check the current screen size
//     if (
//       matchMedia("(max-width: 27.5em)").matches
//       // matchMedia("(max-width: 50em)").matches
//     ) {
//       // Hide the search section on phone and mini-tablet
//       $("#search-section").hide();
//       // Show the back button
//       $("#mobile-back-btn").show();
//       // Update header title and hide advance search
//       $("#mobile-header-title").text("Patient Details");
//       $("#mobile-adsearch").hide();
//     } else {
//       // Show the search section on larger screens
//       $("#search-section").show();
//       // Hide the back button
//       $("#mobile-back-btn").hide();
//     }
//   });

//   // Add click event handler to the back button
//   $("#mobile-back-btn").click(function () {
//     if ($("#search-section").is(":visible")) {
//       // Redirect to another page if on search section
//       window.location.href = "../Index.html"; // Replace with your desired URL
//     } else {
//       // Show the search section
//       $("#search-section").show();
//       // Hide the patient details section
//       $("#patient-details").hide();
//       // Reset header title and show advance search
//       $("#mobile-header-title").text("");
//       $("#mobile-adsearch").show();
//     }
//   });

//   // NEW Add resize event handler to the window
//   $(window).resize(function () {
//     // Check the current screen size
//     if (matchMedia("(max-width: 27.5em)").matches) {
//       // Hide the patient details section on phone and mini-tablet
//       $("#patient-details").hide();
//       // Show the search section on phone and mini-tablet
//       $("#search-section").show();
//       // Show the back button
//       $("#mobile-back-btn").show();
//       // Reset header title and show advance search
//       $("#mobile-header-title").text("");
//       $("#mobile-adsearch").show();
//     } else {
//       // Show the patient details section on larger screens
//       $("#patient-details").show();
//       // Show the search section on larger screens
//       $("#search-section").show();
//       // Hide the back button
//       $("#mobile-back-btn").hide();
//     }
//   });
// });

// NEW CODE FOR RESPONSIVE DESIGN

// JavaScript Code
$(document).ready(function () {
  // Function to handle mobile view logic
  function handleMobileView() {
    const isMobile = matchMedia("(max-width: 27.5em)").matches;

    if (isMobile) {
      // Hide search section and show patient details on mobile
      $("#search-section").hide();
      $("#patient-details").show();
      $("#mobile-back-btn").show();
      $("#mobile-header-title").text("Patient Details");
      $("#mobile-adsearch").hide();
    } else {
      // Show both sections on larger screens
      $("#search-section").show();
      $("#patient-details").show();
      $("#mobile-back-btn").hide();
      $("#mobile-header-title").text("");
      $("#mobile-adsearch").show();
    }
  }

  // Call handleMobileView on page load
  handleMobileView();

  // Add click event handlers to patient cards
  $(".patient-card").click(function () {
    const isMobile = matchMedia("(max-width: 27.5em)").matches;

    if (isMobile) {
      // On mobile, update the patient details content here
      // Add your logic to update patient details based on the clicked card
    }
    // Show patient details section regardless of screen size
    $("#patient-details").show();
  });

  // Add click event handler to the back button
  $("#mobile-back-btn").click(function () {
    window.location.href = "../Index.html"; // Replace with your desired URL
  });

  // Add resize event handler to the window
  $(window).resize(function () {
    handleMobileView();
  });
});
