$(document).ready(function () {
  const $desktopListItems = $(".p-navigation__desktop-list li");
  const $modalListItems = $(".p-navigation__modal-list li");
  const $divs = $(
    ".personal-infomaindiv, .Insurance-infodiv, .Noninsurance-infodiv, .Dependencies-infodiv, .Attachment-infodiv, .Audittrail-infodiv, .Appoinment-infodiv, .Visits-infodiv, .Questionire-infodiv, .Registration-infodiv, .Locations-infodiv"
  );
  const $navigationToggle = $(".p-navigation__toggle");
  const $modal = $(".p-navigation__modal");
  const $modalClose = $(".p-navigation__modal-close");
  const $selectedText = $(".p-navigation__selected-text");

  // Initially, apply the 'selected' class to the first list items and show the first div
  $desktopListItems.first().addClass("selected");
  $modalListItems.first().addClass("selected");
  $divs.first().show();

  // Hide all other divs except the first one
  $divs.not(":first").hide();

  // Open modal
  $navigationToggle.on("click", function () {
    $modal.addClass("show");
    $("body").addClass("modal-open");
  });

  // Close modal
  function closeModal() {
    $modal.removeClass("show");
    $("body").removeClass("modal-open");
  }

  $modalClose.on("click", closeModal);

  // Close modal when clicking outside the content
  $modal.on("click", function (event) {
    if ($(event.target).is($modal)) {
      closeModal();
    }
  });

  // Handle desktop list item clicks
  $desktopListItems.on("click", function () {
    const $this = $(this);
    const selectedText = $this.text();
    const index = $desktopListItems.index(this);

    // Update desktop list
    $desktopListItems.removeClass("selected");
    $this.addClass("selected");

    // Update modal list
    $modalListItems.removeClass("selected");
    $modalListItems.eq(index).addClass("selected");

    // Update selected text and content
    updateSelection(selectedText, index);
  });

  // Handle modal list item clicks
  $modalListItems.on("click", function () {
    const $this = $(this);
    const selectedText = $this.text();
    const index = $modalListItems.index(this);

    // Update modal list
    $modalListItems.removeClass("selected");
    $this.addClass("selected");

    // Update desktop list
    $desktopListItems.removeClass("selected");
    $desktopListItems.eq(index).addClass("selected");

    // Update selected text and content
    updateSelection(selectedText, index);

    // Close modal
    closeModal();
  });

  // Helper function to update selection
  function updateSelection(selectedText, index) {
    $selectedText.text(selectedText);
    $divs.hide();
    $divs.eq(index).show();
  }

  // Close modal on escape key
  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
