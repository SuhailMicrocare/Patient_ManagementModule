$(document).ready(function () {
  // Initialize variables
  let currentStep = 1;
  const totalSteps = 3;
  const formData = {
    // Personal Information
    firstNameEn: "",
    secondNameEn: "",
    lastNameEn: "",
    birthDateH: { day: "", month: "", year: "" },
    birthDateG: { day: "", month: "", year: "" },
    bloodGroup: "",
    mobileNumber: "",
    age: "",
    gender: "",

    // Social Details
    maritalStatus: "",
    residence: "",
    identityNumber: "",
    nationality: "",
    fatherPersonalId: "",
    motherPersonalId: "",
    patientPhoto: null,

    // Additional Information
    howYouKnowUs: "",
    additionalInfo: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  };

  // Cache DOM elements
  const $form = $("#patientForm");
  const $nextBtn = $("#nextBtn");
  const $backBtn = $("#backBtn");
  const $steps = $(".form-step");
  const $stepIndicators = $(".step-indicator .step");
  const $stepLabels = $(".step-label");

  // Initialize form options
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];
  const maritalStatus = ["Single", "Married", "Divorced", "Widowed"];
  const nationalities = [
    "Saudi Arabian",
    "UAE",
    "Kuwaiti",
    "Omani",
    "Bahraini",
    "Qatari",
    "Other",
  ];
  const howYouKnowUs = [
    "Friend",
    "Social Media",
    "Advertisement",
    "Doctor Referral",
    "Other",
  ];

  // Populate date selects
  function populateDateSelects() {
    // Days
    const $daySelects = $('select[name$=".day"]');
    for (let i = 1; i <= 31; i++) {
      $daySelects.append(
        $("<option>", {
          value: i,
          text: i,
        })
      );
    }

    // Months
    const $monthSelects = $('select[name$=".month"]');
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    months.forEach((month, index) => {
      $monthSelects.append(
        $("<option>", {
          value: index + 1,
          text: month,
        })
      );
    });

    // Years
    const $yearSelects = $('select[name$=".year"]');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      $yearSelects.append(
        $("<option>", {
          value: i,
          text: i,
        })
      );
    }
  }

  // Populate ages
  function populateAges() {
    const $ageSelect = $('select[name="age"]');
    for (let i = 0; i <= 120; i++) {
      $ageSelect.append(
        $("<option>", {
          value: i,
          text: i + " years",
        })
      );
    }
  }

  // Populate all select options
  function populateSelect(selector, options) {
    const $select = $(selector);
    if (!$select.length) return;

    options.forEach((option) => {
      $select.append(
        $("<option>", {
          value: option,
          text: option,
        })
      );
    });
  }

  // Initialize all select elements
  populateSelect('select[name="bloodGroup"]', bloodGroups);
  populateSelect('select[name="gender"]', genders);
  populateSelect('select[name="maritalStatus"]', maritalStatus);
  populateSelect('select[name="nationality"]', nationalities);
  populateSelect('select[name="howYouKnowUs"]', howYouKnowUs);
  populateDateSelects();
  populateAges();

  // Handle photo upload
  $("#patientPhoto").on("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      formData.patientPhoto = file;
      // Show preview
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#photoPreview").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle address and emergency contact form display
  $(".adddetail__addbutton").on("click", function () {
    const $form = $(this).closest(".Additionalinfo__contactdiv").find("form");
    $form.toggleClass("d-none");
  });

  // Collect form data for each step
  function collectFormData() {
    const $currentStepElements = $(`[data-step="${currentStep}"]`).find(
      "input, select, textarea"
    );

    $currentStepElements.each(function () {
      const name = $(this).attr("name");
      const value = $(this).val();

      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        formData[parent] = formData[parent] || {};
        formData[parent][child] = value;
      } else {
        formData[name] = value;
      }
    });
  }

  // Validate current step
  function validateStep() {
    let isValid = true;
    const $requiredFields = $(`[data-step="${currentStep}"]`).find(
      "[required]"
    );

    $requiredFields.each(function () {
      if (!$(this).val()) {
        isValid = false;
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");
      }
    });

    return isValid;
  }

  // Handle next button click
  $nextBtn.on("click", function () {
    if (!validateStep()) {
      return;
    }

    collectFormData();

    if (currentStep < totalSteps) {
      currentStep++;
      updateFormDisplay();
    } else {
      // Hide patient modal
      const patientModal = bootstrap.Modal.getInstance($("#patientModal")[0]);
      patientModal.hide();

      // Show success modal
      const successModal = new bootstrap.Modal($("#successModal"));
      successModal.show();

      // Reset form after closing success modal
      $("#successModal").on("hidden.bs.modal", function () {
        currentStep = 1;
        updateFormDisplay();
        $form[0].reset();
        $("#photoPreview").hide();
      });
    }
  });

  // Handle back button click
  $backBtn.on("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateFormDisplay();
    }
  });

  // Update form display
  function updateFormDisplay() {
    // Hide all steps and show current
    $steps.addClass("d-none");
    $(`[data-step="${currentStep}"]`).removeClass("d-none");

    // Update step indicators
    $stepIndicators.each(function (index) {
      $(this).removeClass("active completed");
      if (index + 1 === currentStep) {
        $(this).addClass("active");
      } else if (index + 1 < currentStep) {
        $(this).addClass("completed");
      }
    });

    // Update step labels
    $stepLabels.removeClass("active");
    $stepLabels.filter(`[data-step="${currentStep}"]`).addClass("active");

    // Update buttons
    $backBtn.toggle(currentStep > 1);
    $nextBtn.text(currentStep === totalSteps ? "Save" : "Continue");
  }

  // Handle modal close/reset
  $("#patientModal").on("hidden.bs.modal", function () {
    currentStep = 1;
    updateFormDisplay();
    $form[0].reset();
    $("#photoPreview").hide();
  });

  // Initialize form display
  updateFormDisplay();
});
