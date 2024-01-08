// Difference between binary search algorithm O(log N) and linear search (find index) built-in method O(N)

const n = 1000000; // 1M array items

// Create an array with elements from 0 based on the idx
const ar = new Array(n).fill(0).map((_, idx) => idx + 1);
const target = 100000;

export const binarySearch = (sortedArray, target) => {
  let leftIndex = 0;
  let rightIndex = sortedArray.length - 1;
  while (leftIndex <= rightIndex) {
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (target === sortedArray[middleIndex]) {
      return middleIndex;
    } else {
      if (target < sortedArray[middleIndex]) {
        rightIndex = middleIndex - 1;
      } else {
        leftIndex = middleIndex + 1;
      }
    }
  }
  return -1;
};

const startCustomBinarySearch = performance.now();
const idxCustomBinarySearch = binarySearch(ar, target);
const endCustomBinarySearch = performance.now();
console.log("idx CustomBinarySearch", idxCustomBinarySearch);
console.log(
  "diff CustomBinarySearch: ",
  endCustomBinarySearch - startCustomBinarySearch
);

const startfindIndex = performance.now();
const idxfindIndex = ar.findIndex((el) => el === target);
const endfindIndex = performance.now();
console.log("idx findIndex", idxfindIndex);
console.log("diff findIndex: ", endfindIndex - startfindIndex);

const startLinearSearch = performance.now();
const linearSearch = (target) => {
  for (let i = 0; i < ar.length; i++) {
    if (ar[i] === target) {
      return i;
    }
  }
};

console.log("idx LinearSearch: ", linearSearch(target));
const endLinearSearch = performance.now();
console.log("diff LinearSearch: ", endLinearSearch - startLinearSearch);
