$(document).ready(function () {
  const $searchInput = $("#patientSearch");
  const $resultList = $("#result-list");

  const suggestions = [
    { en: "Mohamed jaleel mubashir alam", ar: "محمد جليل مبشر عالم" },
    { en: "Mohamed Ahmed Ali", ar: "محمد أحمد علي" },
    { en: "Mohamed Farooq", ar: "محمد فاروق" },
    { en: "Muhammed Suhail", ar: "محمد سهيل" },
  ];

  $searchInput.on("input", search);

  function search() {
    const searchTerm = $searchInput.val().trim();
    if (searchTerm) {
      const filteredSuggestions = suggestions.filter(
        (item) =>
          item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.ar.toLowerCase().includes(searchTerm.toLowerCase())
      );

      $resultList.empty(); // Clear previous results
      filteredSuggestions.forEach((item) => {
        const $listItem = $(`
          <li style="display: flex; justify-content: space-between; direction: ltr;">
            <span class="en">${item.en}</span>
            <span class="ar">${item.ar}</span>
          </li>
        `);

        // Add a click event to navigate to the Infodashboard.html page
        $listItem.on("click", function () {
          window.location.href = "Infodashboard.html";
        });

        $resultList.append($listItem);
      });
    } else {
      $resultList.empty(); // Clear results if no search term
    }
  }

  $(document).on("click", function (event) {
    if (
      !$searchInput.is(event.target) &&
      !$resultList.is(event.target) &&
      !$resultList.has(event.target).length
    ) {
      $resultList.empty(); // Clear results on click outside
    }
  });
});
