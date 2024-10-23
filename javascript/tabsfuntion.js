$(document).ready(function () {
  // Initial setup for the icons
  $(".collapse").each(function () {
    var isExpanded = $(this).attr("id") === "basicdetails"; // Check if it's the default expanded section
    var toggleCollapseLink = $(this).prev().find(".toggle-collapse");
    var plusIcon = toggleCollapseLink.find(".plus-icon");
    var minusIcon = toggleCollapseLink.find(".minus-icon");

    if (isExpanded) {
      plusIcon.hide(); // Hide the plus icon if it's expanded
      minusIcon.show(); // Show the minus icon if it's expanded
    } else {
      plusIcon.show(); // Show the plus icon if collapsed
      minusIcon.hide(); // Hide the minus icon if collapsed
    }
  });

  // Handle click event for toggling
  $(".toggle-collapse").on("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    var collapseElement = $(this).attr("href"); // Get the ID of the collapsed element
    var plusIcon = $(this).find(".plus-icon");
    var minusIcon = $(this).find(".minus-icon");

    // Collapse all sections and reset icons
    $(".collapse").not(collapseElement).collapse("hide");
    $(".toggle-collapse").not(this).find(".minus-icon").hide();
    $(".toggle-collapse").not(this).find(".plus-icon").show();

    // Check if the clicked section is already expanded
    if ($(collapseElement).hasClass("show")) {
      // If it's already shown, collapse it
      $(collapseElement).collapse("hide");
      plusIcon.show(); // Show plus icon
      minusIcon.hide(); // Hide minus icon
    } else {
      // If it's not shown, expand it
      $(collapseElement).collapse("show");
      plusIcon.hide(); // Hide plus icon
      minusIcon.show(); // Show minus icon
    }
  });

  // Ensure to hide the minus icon when the last section is collapsed
  $(".collapse").on("hidden.bs.collapse", function () {
    var toggleCollapseLink = $(this).prev().find(".toggle-collapse");
    toggleCollapseLink.find(".plus-icon").show(); // Show plus icon
    toggleCollapseLink.find(".minus-icon").hide(); // Hide minus icon
  });

  // Ensure to show the minus icon when the last section is expanded
  $(".collapse").on("shown.bs.collapse", function () {
    var toggleCollapseLink = $(this).prev().find(".toggle-collapse");
    toggleCollapseLink.find(".plus-icon").hide(); // Hide plus icon
    toggleCollapseLink.find(".minus-icon").show(); // Show minus icon
  });
});
