$(document).ready(function () {
  const canvas = $("#signatureCanvas")[0];
  const ctx = canvas.getContext("2d");
  let isDrawing = false;

  // Ensure the canvas size is properly set based on the actual DOM size
  function resizeCanvas() {
    canvas.width = $("#signatureCanvas").width();
    canvas.height = 200; // Set to a fixed height
  }

  // Set the canvas size and other properties initially
  resizeCanvas();

  // Get the mouse/touch position relative to the canvas
  function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  // Start drawing on mouse or touch
  function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = "#000"; // Set the line color to black
    ctx.lineWidth = 2; // Set the line width
    ctx.lineCap = "round"; // Smooth drawing lines
    ctx.beginPath();
    canvas.style.cursor = "crosshair"; // Change the cursor to crosshair when drawing
  }

  // Draw on canvas
  function draw(e) {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  // Stop drawing
  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
    canvas.style.cursor = "default"; // Reset cursor to default when not drawing
  }

  // Handle mouse events
  $("#signatureCanvas")
    .on("mousedown", function (e) {
      startDrawing(e);
    })
    .on("mousemove", function (e) {
      draw(e);
    })
    .on("mouseup", function () {
      stopDrawing();
    })
    .on("mouseout", function () {
      stopDrawing();
    });

  // Handle touch events for mobile devices
  $("#signatureCanvas")
    .on("touchstart", function (e) {
      startDrawing(e.originalEvent.touches[0]);
    })
    .on("touchmove", function (e) {
      draw(e.originalEvent.touches[0]);
    })
    .on("touchend", function () {
      stopDrawing();
    });

  // Clear the canvas
  $("#clearBtn").click(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Adjust canvas size on window resize
  $(window).on("resize", function () {
    resizeCanvas();
  });
});
