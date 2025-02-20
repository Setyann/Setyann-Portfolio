function checkError() {
  let boolean
  let result
  if (onmessageerror) {
    boolean = true
  } else {
    boolean = false
  }
  if (boolean === true) {
    result = 'You have an error in JS'
  } else {
    result = 'JavaScript is working correctly!'
  }
  return result
}

let errors = checkError()
console.info(errors);