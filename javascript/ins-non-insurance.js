// new updated on 25/11/24 js code with file input issue fixed
// FINAL WORKING CODE ALL UPDATED AND FIXED 25/11/24
$(document).ready(function () {
  // Edit button click handler
  $("#non-inc-editbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling

    // Store the scroll position
    const scrollPosition = $(window).scrollTop();

    // Hide the insurance info div with fade out
    $("#Noninsurance-infodiv").fadeOut(200, function () {
      // Show the editor div with fade in
      $("#Noninsurance-editor-div")
        .css({
          display: "none", // Ensure it's hidden before fade in
          backgroundColor: "#ffffff",
          borderRadius: "1.2rem",
          padding: "1.6rem 1.5rem 0.5rem 1.5rem",
          height: "100%",
        })
        .fadeIn(200);

      // Restore scroll position
      $(window).scrollTop(scrollPosition);
    });
  });

  // Back button click handler
  $("#noninc-bckbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    hideEditorDiv();
  });

  // Cancel button click handler
  $("#noninc-cancelbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    hideEditorDiv();
  });

  // Function to hide editor div and show info div
  function hideEditorDiv() {
    // Store the scroll position
    const scrollPosition = $(window).scrollTop();

    // Hide the editor div with fade out
    $("#Noninsurance-editor-div").fadeOut(200, function () {
      // Show the insurance info div with fade in
      $("#Noninsurance-infodiv")
        .css({
          display: "none", // Ensure it's hidden before fade in
          backgroundColor: "#ffffff",
          borderRadius: "1.2rem",
          padding: "1.6rem 1.5rem 0.5rem 1.5rem",
          height: "100%",
        })
        .fadeIn(200);

      // Restore scroll position
      $(window).scrollTop(scrollPosition);
    });
  }

  // Insurance Edit button click handler
  $("#inc-editbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling

    // Store the scroll position
    const scrollPosition = $(window).scrollTop();

    // Hide the insurance info div with fade out
    $("#Insurance-infodiv").fadeOut(200, function () {
      // Show the editor div with fade in
      $("#Insurance-editor-div")
        .css({
          display: "none", // Ensure it's hidden before fade in
          backgroundColor: "#ffffff",
          borderRadius: "1.2rem",
          padding: "1.6rem 1.5rem 0.5rem 1.5rem",
          height: "100%",
        })
        .fadeIn(200);

      // Restore scroll position
      $(window).scrollTop(scrollPosition);
    });
  });

  // Back button click handler
  $("#inc-bckbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    hideInsuranceEditorDiv();
  });

  // Cancel button click handler
  $("#inc-cancelbtn").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    hideInsuranceEditorDiv();
  });

  // Function to hide insurance editor div and show info div
  function hideInsuranceEditorDiv() {
    // Store the scroll position
    const scrollPosition = $(window).scrollTop();

    // Hide the editor div with fade out
    $("#Insurance-editor-div").fadeOut(200, function () {
      // Show the insurance info div with fade in
      $("#Insurance-infodiv")
        .css({
          display: "none", // Ensure it's hidden before fade in
          backgroundColor: "#ffffff",
          borderRadius: "1.2rem",
          padding: "1.6rem 1.5rem 0.5rem 1.5rem",
          height: "100%",
        })
        .fadeIn(200);

      // Restore scroll position
      $(window).scrollTop(scrollPosition);
    });
  }

  // Click outside handler with improved file input handling
  $(document).on("click", function (e) {
    // Check if editor div is visible
    if ($("#Noninsurance-editor-div").is(":visible")) {
      // Check if the clicked element is not inside the editor div
      // and not part of the edit button, back button, or file input elements
      if (
        !$(e.target).closest("#Noninsurance-editor-div").length &&
        !$(e.target).hasClass("non-inc-editbtn") &&
        !$(e.target).closest("#non-inc-editbtn").length &&
        !$(e.target).hasClass("noninc-bckbtn") &&
        !$(e.target).closest("#noninc-bckbtn").length &&
        !$(e.target).closest(".custom-file-input").length && // Exclude file input
        !$(e.target).closest(".custom-file-label-inc").length && // Exclude file label
        !$(e.target).closest(".choose-file-wrapper").length // Exclude entire file wrapper
      ) {
        // Hide the editor div
        hideEditorDiv();
      }
    }

    // Check if insurance editor div is visible
    if ($("#Insurance-editor-div").is(":visible")) {
      // Check if the clicked element is not inside the editor div
      // and not part of the edit button, back button, or file input elements
      if (
        !$(e.target).closest("#Insurance-editor-div").length &&
        !$(e.target).hasClass("inc-editbtn") &&
        !$(e.target).closest("#inc-editbtn").length &&
        !$(e.target).hasClass("inc-bckbtn") &&
        !$(e.target).closest("#inc-bckbtn").length &&
        !$(e.target).closest(".custom-file-input").length && // Exclude file input
        !$(e.target).closest(".custom-file-label-inc").length && // Exclude file label
        !$(e.target).closest(".choose-file-wrapper").length // Exclude entire file wrapper
      ) {
        // Hide the editor div
        hideInsuranceEditorDiv();
      }
    }
  });

  // Add file input change handler to update filename display
  $(".custom-file-input").on("change", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    const fileName = e.target.files[0]?.name || "No file chosen";
    $(this).siblings(".file-name").text(fileName);
  });

  // Prevent click events on file input wrapper from bubbling
  $(".choose-file-wrapper").on("click", function (e) {
    e.stopPropagation();
  });

  // Initialize the editor divs with the correct styling but hidden
  $("#Noninsurance-editor-div, #Insurance-editor-div").css({
    display: "none",
    backgroundColor: "#ffffff",
    borderRadius: "1.2rem",
    padding: "1.6rem 1.5rem 0.5rem 1.5rem",
    height: "100%",
  });

  // Define the placeholders for mobile view
  const mobilePlaceholders = {
    "tpa-select": "Third-Party Administrator (TPA)",
    "membership-input": "Membership Number",
    "company-select": "Max Life Term Life Insurance",
    "policyholder-select": "Insurance Policyholder Name",
    "policy-input": "Policy Number",
    "start-date": "Insurance Start Date",
    "end-date": "Insurance End Date",
    "class-select": "Insurance Class Title",
    "insurance-card": "Insurance Card",
    "period-input": "Period",
    "visits-input": "Visits",
    "approval-input": "Approval Limit Per Episode",
    "patient-share-input": "Patient Max Share Per Episode",
    "service-type-select": "Service Type Classification",
    "noninc-membership-input": "Membership Number",
    "noninc-company-select": "Non-Insurance Company",
    "noninc-start-date": "Non-Insurance Start",
    "noninc-end-date": "Non-Insurance End",
    "noninc-class-select": "Non-Insurance Class Title",
    "noninc-insurance-card": "Non-Insurance Card",
    "noninc-approval-letter": "Approval Letter",
    "noninc-period-input": "Period",
    "noninc-visits-input": "Visits",
    "noninc-patient-share-input": "Patient Max Share Per Episode",
  };

  // Define the default desktop placeholders
  const desktopPlaceholders = {
    "tpa-select": "21123213",
    "membership-input": "21123213",
    "company-select": "21123213",
    "policyholder-select": "21123213",
    "policy-input": "21123213",
    "start-date": "21123213",
    "end-date": "21123213",
    "class-select": "21123213",
    "insurance-card": "21123213",
    "period-input": "21123213",
    "visits-input": "21123213",
    "approval-input": "21123213",
    "patient-share-input": "21123213",
    "service-type-select": "21123213",
    "noninc-membership-input": "98745642",
    "noninc-company-select": "98745642",
    "noninc-start-date": "98745642",
    "noninc-end-date": "98745642",
    "noninc-class-select": "98745642",
    "noninc-insurance-card": "98745642",
    "noninc-approval-letter": "98745642",
    "noninc-period-input": "98745642",
    "noninc-visits-input": "98745642",
    "noninc-patient-share-input": "98745642",
  };

  // Function to update placeholders based on screen width
  function updatePlaceholders() {
    const isMobile = window.matchMedia("(max-width: 27.5em)").matches;
    const placeholders = isMobile ? mobilePlaceholders : desktopPlaceholders;

    // Update all form elements
    for (const [id, placeholder] of Object.entries(placeholders)) {
      const element = document.getElementById(id);
      if (element) {
        if (element.tagName === "SELECT") {
          const firstOption = element.querySelector("option:first-child");
          if (firstOption) {
            firstOption.textContent = placeholder;
          }
        } else if (element.type === "date") {
          // Special handling for date inputs
          if (isMobile) {
            element.type = "text";
            element.placeholder = placeholder;
            // Add focus event to switch back to date type
            element.addEventListener("focus", function () {
              this.type = "date";
            });
            // Add blur event to switch back to text if no date is selected
            element.addEventListener("blur", function () {
              if (!this.value) {
                this.type = "text";
              }
            });
          } else {
            element.type = "date";
            element.placeholder = placeholder;
          }
        } else {
          element.placeholder = placeholder;
        }
      }
    }
  }

  // Add event listeners for responsive placeholders
  window.addEventListener("load", updatePlaceholders);
  window.addEventListener("resize", updatePlaceholders);
});
