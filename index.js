import { selectionSort } from "./selectionSort.mjs";
import { bubbleSort } from "./bubbleSort.mjs";

const defaultArray = [50, 100, 100, 205, 40, 60, 20, 80,10,50,20,50,40,100,20,30];

const algorithms = {
  select: selectionSort,
  bubble: bubbleSort,
};

let minIdx, currentIdx;

document.addEventListener("DOMContentLoaded", function () {
  // Get the Canvas element and its context
  let canvas = document.getElementById("barChart");
  let ctx = canvas.getContext("2d");

  // Data for the bar chart

  // Bar properties
  let barWidth = 30;
  let barSpacing = 20;
  let barColor = "#3498db";
  const renderCanvas = (data, minIdx, currentIdx) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw bars
    for (let i = 0; i < data.length; i++) {
      const x = i * (barWidth + barSpacing);
      var y = canvas.height - data[i];

      // Check if the current bar is the one to highlight as the minimum or the current
      if (i === minIdx) {
        ctx.fillStyle = "#ff0000"; // Red for minimum
      } else if (i === currentIdx) {
        ctx.fillStyle = "#00ff00"; // Green for current
      } else {
        ctx.fillStyle = barColor; // Default color for other bars
      }
      ctx.fillRect(x, y, barWidth, data[i]);
    }
  };

  renderCanvas(defaultArray, minIdx, currentIdx);

  const option = document.querySelector("select");

  option.addEventListener("change", (event) => {
    const selectedAlgorithm = event.target.value;
    if (selectedAlgorithm === "default") {
      renderCanvas(defaultArray);
    } else {
      algorithms[selectedAlgorithm](defaultArray, renderCanvas);
    }
  });
});
