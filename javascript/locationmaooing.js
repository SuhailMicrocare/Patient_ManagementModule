let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.963158, lng: 35.930359 }, // Default location (Amman, Jordan)
    zoom: 15,
  });

  // Add a draggable marker
  marker = new google.maps.Marker({
    position: { lat: 31.963158, lng: 35.930359 },
    map: map,
    draggable: true,
  });

  // Marker dragend event to update the location fields
  google.maps.event.addListener(marker, "dragend", function () {
    let markerPosition = marker.getPosition();
    updateLocationFields(markerPosition);
  });

  // Map click event to move the marker and update the location fields
  google.maps.event.addListener(map, "click", function (event) {
    marker.setPosition(event.latLng);
    updateLocationFields(event.latLng);
  });
}

// Update latitude and longitude fields using jQuery
function updateLocationFields(location) {
  $(".location__latitude-input").val(location.lat()); // Set latitude value
  $(".location__longitude-input").val(location.lng()); // Set longitude value
}

// Ensure initMap is called after the modal is shown
$(document).ready(function () {
  $("#addlocationnmodal").on("shown.bs.modal", function () {
    initMap();
    google.maps.event.trigger(map, "resize");
    map.setCenter({ lat: 31.963158, lng: 35.930359 });
  });
});
