$(document).ready(function () {
  const $fromDateInput = $(".visit__fromdate-input");
  const $endDateInput = $(".visit__enddate-input");

  // Set initial placeholder value when input is empty
  if (!$fromDateInput.val()) {
    $fromDateInput.attr("type", "text");
    $fromDateInput.attr("placeholder", "From Date");
  }

  if (!$endDateInput.val()) {
    $endDateInput.attr("type", "text");
    $endDateInput.attr("placeholder", "To Date");
  }

  // Change to date type when the user focuses on the field
  $fromDateInput.focus(function () {
    $(this).attr("type", "date");
  });

  $endDateInput.focus(function () {
    $(this).attr("type", "date");
  });

  // Switch back to text type if the field is empty when it loses focus
  $fromDateInput.blur(function () {
    if (!$(this).val()) {
      $(this).attr("type", "text");
      $(this).attr("placeholder", "From Date");
    }
  });

  $endDateInput.blur(function () {
    if (!$(this).val()) {
      $(this).attr("type", "text");
      $(this).attr("placeholder", "To Date");
    }
  });
});
