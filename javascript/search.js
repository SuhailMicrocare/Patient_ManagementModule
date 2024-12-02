// FIRST ATTEMT CODE
// $(document).ready(function () {
//   const $searchInput = $("#patientSearch");
//   const $resultList = $("#result-list");

//   const suggestions = [
//     { en: "Mohamed jaleel mubashir alam", ar: "محمد جليل مبشر عالم" },
//     { en: "Mohamed Ahmed Ali", ar: "محمد أحمد علي" },
//     { en: "Mohamed Farooq", ar: "محمد فاروق" },
//     { en: "Muhammed Suhail", ar: "محمد سهيل" },
//   ];

//   $searchInput.on("input", search);

//   function search() {
//     const searchTerm = $searchInput.val().trim();
//     if (searchTerm) {
//       const filteredSuggestions = suggestions.filter(
//         (item) =>
//           item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.ar.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       $resultList.empty(); // Clear previous results
//       filteredSuggestions.forEach((item) => {
//         const $listItem = $(`
//           <li style="display: flex; justify-content: space-between; direction: ltr;">
//             <span class="en">${item.en}</span>
//             <span class="ar">${item.ar}</span>
//           </li>
//         `);

//         // Add a click event to navigate to the Infodashboard.html page
//         $listItem.on("click", function () {
//           window.location.href = "Infodashboard.html";
//         });

//         $resultList.append($listItem);
//       });
//     } else {
//       $resultList.empty(); // Clear results if no search term
//     }
//   }

//   $(document).on("click", function (event) {
//     if (
//       !$searchInput.is(event.target) &&
//       !$resultList.is(event.target) &&
//       !$resultList.has(event.target).length
//     ) {
//       $resultList.empty(); // Clear results on click outside
//     }
//   });
// });

//working code 2nd version
$(document).ready(function () {
  // Cache DOM elements
  const $searchInput = $("#patientSearch");
  const $resultList = $("#result-list");
  const $searchSection = $("#search-section");
  const $patientDetails = $("#patient-details");
  const $mobileBackBtn = $("#mobile-back-btn");
  const $mobileHeaderTitle = $("#mobile-header-title");
  const $mobileAdSearch = $("#mobile-adsearch");
  const $patientCard = $(".patient-card");

  // Constants
  const PHONE_BREAKPOINT = "(max-width: 27.5em)"; // 440px

  const suggestions = [
    { en: "Mohamed jaleel mubashir alam", ar: "محمد جليل مبشر عالم" },
    { en: "Mohamed Ahmed Ali", ar: "محمد أحمد علي" },
    { en: "Mohamed Farooq", ar: "محمد فاروق" },
    { en: "Muhammed Suhail", ar: "محمد سهيل" },
  ];

  // Initialize view based on URL and localStorage
  initializeView();

  function initializeView() {
    if (window.location.pathname.includes("Infodashboard")) {
      if (matchMedia(PHONE_BREAKPOINT).matches) {
        const shouldShowDetails =
          localStorage.getItem("showPatientDetails") === "true";
        if (shouldShowDetails) {
          // Use setTimeout to ensure DOM is fully loaded
          setTimeout(() => {
            showPatientDetails();
            localStorage.removeItem("showPatientDetails");
          }, 0);
        }
      }
    }
  }

  // Search functionality
  $searchInput.on("input", handleSearch);

  function handleSearch() {
    const searchTerm = $searchInput.val().trim();
    if (searchTerm) {
      const filteredSuggestions = suggestions.filter(
        (item) =>
          item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.ar.toLowerCase().includes(searchTerm.toLowerCase())
      );

      $resultList.empty();
      filteredSuggestions.forEach((item) => {
        const $listItem = $(`
          <li style="display: flex; justify-content: space-between; direction: ltr;">
            <span class="en">${item.en}</span>
            <span class="ar">${item.ar}</span>
          </li>
        `);

        $listItem.on("click", handleResultClick);
        $resultList.append($listItem);
      });
    } else {
      $resultList.empty();
    }
  }

  function handleResultClick() {
    if (matchMedia(PHONE_BREAKPOINT).matches) {
      // For mobile view, set flag and navigate
      localStorage.setItem("showPatientDetails", "true");
      // Add a small delay before navigation to ensure localStorage is set
      setTimeout(() => {
        window.location.href = "Infodashboard.html";
      }, 30);
    } else {
      // For desktop view, navigate directly
      window.location.href = "Infodashboard.html";
    }
  }

  // Function to show patient details with transition
  function showPatientDetails() {
    if ($searchSection.length && $patientDetails.length) {
      // Add a CSS class for smooth transition
      $searchSection.fadeOut(100, () => {
        $patientDetails.fadeIn(100);
        $mobileBackBtn.show();
        $mobileHeaderTitle.text("Patient Details");
        $mobileAdSearch.hide();
      });
    }
  }

  // Function to show search section with transition
  function showSearchSection() {
    if ($searchSection.length && $patientDetails.length) {
      $patientDetails.fadeOut(100, () => {
        $searchSection.fadeIn(100);
        $mobileBackBtn.show();
        $mobileHeaderTitle.text("");
        $mobileAdSearch.show();
      });
    }
  }

  // Patient card click handler
  $patientCard.on("click", function () {
    if (matchMedia(PHONE_BREAKPOINT).matches) {
      showPatientDetails();
    }
  });

  // Back button functionality
  $mobileBackBtn.on("click", function () {
    if ($searchSection.is(":visible")) {
      window.location.href = "../Index.html";
    } else {
      showSearchSection();
    }
  });

  // Outside click handler for search results
  $(document).on("click", function (event) {
    if (
      !$searchInput.is(event.target) &&
      !$resultList.is(event.target) &&
      !$resultList.has(event.target).length
    ) {
      $resultList.empty();
    }
  });

  // Window resize handler with debounce
  let resizeTimeout;
  $(window).on("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (matchMedia(PHONE_BREAKPOINT).matches) {
        if ($patientDetails.is(":visible")) {
          showPatientDetails();
        } else {
          showSearchSection();
        }
      } else {
        // Desktop view - show both sections
        if ($searchSection.length && $patientDetails.length) {
          $searchSection.show();
          $patientDetails.show();
          $mobileBackBtn.hide();
        }
      }
    }, 250);
  });
});
