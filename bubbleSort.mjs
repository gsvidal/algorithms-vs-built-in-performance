// const ar = [5, 2, 4, 4, 3];
// const n = 100000;

// const ar = new Array(n).fill(0).map((_, index) => index + 1);
// i = 0; j = 0; [2,5,4,4,3]
// i = 0; j = 1; [2,4,5,4,3]
// i = 0; j = 2; [2,4,4,5,3]
// i = 0; j = 3; [2,4,4,3,5]

// i = 1; j = 0; [2,4,4,3,5]
// i = 1; j = 1; [2,4,4,3,5]
// i = 1; j = 2; [2,4,3,4,5]
// i = 1; j = 3; exit

// i = 2; j = 0; [2,4,3,4,5]
// i = 2; j = 1; [2,3,4,4,5]
// i = 2; j = 2; exit

// i = 3; j = 0; [2,3,4,4,5]
// i = 3; j = 1; exit

// i = 4; j = 0; exit

import { sleep } from "./helpers.mjs";

// ascending order
export const bubbleSort = async (unsortedArray, callback, control) => {
  const array = [...unsortedArray];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (control.stop) return;
      if (array[j] > array[j + 1]) {
        //swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        callback("bubble-swap", array, j, j + 1);
        await sleep(control.time);
      } else {
        callback("bubble", array, j, j + 1);
        await sleep(control.time);
      }
    }
  }
  return array;
};

// const start = performance.now();

// const sortedArr = bubbleSort(ar);
// console.log(sortedArr);
// const end = performance.now();

// console.log(end - start);
