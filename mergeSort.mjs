import { sleep } from "./helpers.mjs";

// let firstRenderMerge = true;
// let originalData;
// let idx;

export const mergeSort = async (unsortedArray, callback, control) => {
  if (control.stop) return ;
  const array = [...unsortedArray];

  if (array.length <= 1) {
    return array;
  }

  const middleIdx = Math.floor(array.length / 2);
  callback("merge", array, middleIdx);
  await sleep(control.time);

  const leftSlice = array.slice(0, middleIdx);
  const rightSlice = array.slice(middleIdx);

  const sortedLeft = await mergeSort(leftSlice, callback, control);

  const sortedRight = await mergeSort(rightSlice, callback, control);

  // Track changes during merging
  const mergedArray = merge(sortedLeft, sortedRight, callback, control);

  return mergedArray;
};

const merge = async (left, right, callback, control) => {
  if (control.stop) return ;
  const newArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      newArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      newArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add the remaining elements from left and right (if any)
  const finalArray = newArray.concat(
    left.slice(leftIndex),
    right.slice(rightIndex)
  );
  
  callback("merge", finalArray, leftIndex);
  await sleep(control.time);
  callback("merge", finalArray, rightIndex);
  await sleep(control.time);
  return finalArray;
};
