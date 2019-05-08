export function reSortArrByTwoElement(arr, oldIndex, newIndex) {
  const cloneArr = JSON.parse(JSON.stringify(arr))
  const one = arr[oldIndex]
  const two = arr[newIndex]
  cloneArr[oldIndex] = two
  cloneArr[newIndex] = one
  return cloneArr
}

