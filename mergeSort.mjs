export const mergeSort = (unsortedArray) => {
  const array = [...unsortedArray];

  if (array.length <= 1) {
    return array;
  }

  const middleIdx = Math.floor(array.length / 2);

  const leftSlice = array.slice(0, middleIdx);
  const rightSlice = array.slice(middleIdx);

  const sortedLeft = mergeSort(leftSlice);

  const sortedRight = mergeSort(rightSlice);

  return merge(sortedLeft, sortedRight);
};

const merge = (left, right) => {
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
  return newArray.concat(left.slice(leftIndex), right.slice(rightIndex));
};

console.log(mergeSort([8, 6, 1, 3]));
