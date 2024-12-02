// WORKIG JS FOR INPUT PREVIWE
$(document).ready(function () {
  // Function to handle file input preview
  function setupFilePreview(inputSelector) {
    $(inputSelector).on("change", function () {
      const fileWrapper = $(this).closest(".choose-file-wrapper");
      const fileNameSpan = fileWrapper.find(".file-name");
      const filePreviewDiv = fileWrapper.find(".file-preview");

      const file = this.files[0];

      // Display file name
      const fileName = file ? file.name : "No file chosen";
      fileNameSpan.text(fileName);

      // Clear the previous preview
      filePreviewDiv.empty();

      // Show file preview based on file type
      if (file) {
        const fileType = file.type;

        // Image Preview
        if (fileType.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = function (e) {
            filePreviewDiv.html(
              `<img src="${e.target.result}" alt="File preview" class="file-preview-image">`
            );
          };
          reader.readAsDataURL(file);
        }
        // Video Preview
        else if (fileType.startsWith("video/")) {
          const reader = new FileReader();
          reader.onload = function (e) {
            filePreviewDiv.html(
              `<video controls class="file-preview-video">
                <source src="${e.target.result}" type="${fileType}">
                Your browser does not support the video tag.
               </video>`
            );
          };
          reader.readAsDataURL(file);
        }
        // PDF Preview (for simple preview)
        else if (fileType === "application/pdf") {
          const reader = new FileReader();
          reader.onload = function (e) {
            filePreviewDiv.html(
              `<iframe src="${e.target.result}" width="100%" height="200px" class="file-preview-pdf"></iframe>`
            );
          };
          reader.readAsDataURL(file);
        } else {
          // For unsupported files, display a placeholder
          filePreviewDiv.html("<p>File type not supported for preview.</p>");
        }
      } else {
        // If no file selected, clear the preview
        filePreviewDiv.empty();
      }
    });
  }

  // Apply file preview to insurance card
  setupFilePreview("#insurance-card");

  // Apply file preview to non-insurance card
  setupFilePreview("#noninc-insurance-card");

  // Apply file preview to approval letter
  setupFilePreview("#noninc-approval-letter");
});
