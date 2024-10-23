$(document).ready(function () {
  const $listItems = $(".p-navigation ul li");
  const $divs = $(
    ".personal-infomaindiv, .Insurance-infodiv, .Noninsurance-infodiv, .Dependencies-infodiv, .Attachment-infodiv, .Audittrail-infodiv, .Appoinment-infodiv, .Visits-infodiv, .Questionire-infodiv, .Registration-infodiv, .Locations-infodiv"
  );

  // Initially, apply the 'selected' class to the first list item and show the first div
  $listItems.first().addClass("selected");
  $divs.first().show();

  // Hide all other divs except .personal-infomaindiv on page load
  $divs.not(":first").hide();

  // Add event listener to each list item
  $listItems.on("click", function () {
    // Remove 'selected' class from all items
    $listItems.removeClass("selected");

    // Add 'selected' class to the clicked item
    $(this).addClass("selected");

    // Hide all divs
    $divs.hide();

    // Show the corresponding div
    const index = $listItems.index(this); // Get the index of the clicked item
    $divs.eq(index).show(); // Show the corresponding div
  });
});
