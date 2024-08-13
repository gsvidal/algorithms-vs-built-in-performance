export const quickSort = (array) => {
  if (array.length <= 1) {
    return array;
  }
  // I'll select the pivot using the medianOfThree (median of first, midle and last items)
  const middlePivot = array[Math.floor(array.length / 2)];
  const firstPivot = array[0];
  const lastPivot = array[array.length - 1];

  const pivot = medianOfThree(firstPivot, middlePivot, lastPivot);

  const leftArray = [];
  const rightArray = [];
  const equalsArray = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      leftArray.push(array[i]);
    } else if (array[i] > pivot) {
      rightArray.push(array[i]);
    } else {
      equalsArray.push(array[i]);
    }
  }

  return [
    ...quickSort(leftArray),
    ...equalsArray,
    ...quickSort(rightArray),
  ];
};

function medianOfThree (a, b, c) {
    if((a > b) !== (a > c)) return a;
    if((b > a) !== (b > c)) return b;
    return c;
  }

const result = quickSort([5, 15, 9, 2, 7]);
const resultSorted = quickSort([2,5,7,9,15]);
const resultReverseSorted = quickSort([15, 9, 7, 5, 2]);
console.log(result);
// pivot: 4
// left: [2, 3]   
   // pivot: 3
   // left: [2]
   // equals: [3]
   // right: []
// equals; [4]
// right: [6, 7]