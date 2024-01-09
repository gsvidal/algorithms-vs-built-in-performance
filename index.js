import { selectionSort } from "./selectionSort.mjs";
import { bubbleSort } from "./bubbleSort.mjs";

const CANVAS_MAX_HEIGHT = 500;
const CANVAS_WIDTH_WIDTH = 1000;
const CANVAS_PADDING_X = 15;

const generateArray = (size = 10) => {
  console.log("generate");
  const ar = new Array(size)
    .fill(0)
    .map(
      (el) => el + 10 + Math.floor((CANVAS_MAX_HEIGHT - 100) * Math.random())
    );
  return ar;
};

let defaultArray = generateArray();

const algorithms = {
  selection: selectionSort,
  bubble: bubbleSort,
};

let minIdx, currentIdx;
let alg = "none";

const legendSelection = `
  <div class="legend-content border">
    <div>
      <span class="legend-color legend-color--red"></span>: <span>Minimun value</span>
    </div>
    <div>
      <span class="legend-color legend-color--green"></span>: <span>Current value</span>
    </div>
  </div>
  `;
const legendBubble = `
  <div class="legend-content border">
    <div>
      <span class="legend-color legend-color--red"></span>: <span>Swapping values</span>
    </div>
    <div>
      <span class="legend-color legend-color--green"></span>: <span>Comparing values (no swap)</span>
    </div>
  </div>
  `;
document.addEventListener("DOMContentLoaded", function () {
  // Get the Canvas element and its context
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");
  const legend = document.querySelector(".legend");

  // Data for the bar chart

  // Bar properties
  const barSpacing = 20;
  canvas.height = CANVAS_MAX_HEIGHT;
  const barColor = "#9c7eff";
  const redColor = "#ff8383";
  const greenColor = "#85ff85";
  const renderCanvas = (alg, data, minIdx, currentIdx) => {
    // console.log("rendered")
    const barWidth =
      (CANVAS_WIDTH_WIDTH -
        CANVAS_PADDING_X * 2 -
        barSpacing * (data.length - 2.5)) /
      data.length;
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw bars
    for (let i = 0; i < data.length; i++) {
      const x = i * (barWidth + barSpacing);
      const y = canvas.height - data[i];

      if (alg === "selection") {
        // Check if the current bar is the one to highlight as the minimum or the current
        if (i === minIdx) {
          ctx.fillStyle = redColor;
        } else if (i === currentIdx) {
          ctx.fillStyle = greenColor;
        } else {
          ctx.fillStyle = barColor;
        }
      } else if (alg === "bubble") {
        if (i === minIdx || i === currentIdx) {
          ctx.fillStyle = greenColor;
        } else {
          ctx.fillStyle = barColor;
        }
      } else if (alg === "bubble-swap") {
        if (i === minIdx || i === currentIdx) {
          ctx.fillStyle = redColor;
        } else {
          ctx.fillStyle = barColor;
        }
      } else {
        ctx.fillStyle = barColor;
      }

      // Draw the bar
      ctx.fillRect(x, y, barWidth, data[i]);
    }
  };

  renderCanvas(alg, defaultArray, minIdx, currentIdx);

  const selectElement = document.querySelector("select");

  const control = {
    time: 1000,
    stop: false,
  };

  const reset = (size = 10, reset) => {
    if (reset) {
      sizeInput.value = 10;
    }
    selectElement.value = "none";
    defaultArray = [...generateArray(size)];
    // console.log(arr);
    selectElement.removeAttribute("disabled");
    control.stop = true;
    renderCanvas("none", defaultArray);
    legend.innerHTML = "";
  };

  const resetButton = document.querySelector(".button--reset");

  resetButton.addEventListener("click", () => reset(10, true));

  selectElement.addEventListener("change", async (event) => {
    event.target.setAttribute("disabled", true);
    const selectedAlgorithm = event.target.value;
    if (selectedAlgorithm !== "none") {
      control.stop = false;
      const sortedArray = await algorithms[selectedAlgorithm](
        defaultArray,
        renderCanvas,
        control
      );
      console.log(sortedArray);
      if (sortedArray?.length > 0) {
        renderCanvas("none", sortedArray);
      }
      if (selectedAlgorithm === "selection") {
        legend.innerHTML = legendSelection;
      } else if (selectedAlgorithm === "bubble") {
        legend.innerHTML = legendBubble;
      }
    }
  });

  const speedInput = document.querySelector(".range--speed");

  speedInput.addEventListener("change", (event) => {
    control.time = event.target.value;
    // console.log(event.target.value);
  });

  const sizeInput = document.querySelector(".range--size");

  sizeInput.addEventListener("change", (event) => {
    reset(+event.target.value);
  });
});
