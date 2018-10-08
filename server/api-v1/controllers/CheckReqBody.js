module.exports = (expectedObj, reqBodyObj) => {
  if (Object.keys(expectedObj).length !== Object.keys(reqBodyObj).length) {
    return false;
  } else {
    for (let i = 0; i < Object.entries(expectedObj).length; i += 1) {
      let requiredPair = Object.entries(expectedObj)[i];
      if (!Object.prototype.hasOwnProperty.call(reqBodyObj, requiredPair[0]) || typeof reqBodyObj[requiredPair[0]] !== requiredPair[1]) {
        return false;
      }
    }
  }
  return true;
};
