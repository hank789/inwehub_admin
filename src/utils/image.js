export function fileToBase64(file, successCallback) {
  var reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = function(e) {
    console.log(e)
    successCallback(e.target.result)
  }
}

export function reloadImage(event, maxErrorNum) {
  const imgObj = event.currentTarget
  console.log(imgObj)
  if (maxErrorNum > 0) {
    imgObj.onerror = function() {
      reloadImage(event, maxErrorNum - 1)
    }
    setTimeout(function() {
      imgObj.src = imgObj.src + '?time' + new Date().getTime()
    }, 500)
  } else {
    imgObj.onerror = null
  }
}
