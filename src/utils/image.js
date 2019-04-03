export function fileToBase64(file, successCallback) {
  var reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = function(e) {
    console.log(e)
    successCallback(e.target.result)
  }
}
