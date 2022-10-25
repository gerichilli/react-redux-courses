export function formatFileQuestionName(fileName) {
  if (fileName.length > 20) {
    return (
      fileName.substring(0, 10) + "..." + fileName.substring(fileName.length - 10, fileName.length)
    );
  }
  return fileName;
}

export function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function HHMMSSFromMilliseconds(ms) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;

  // 2- Extract hours:
  var hours = parseInt(seconds / 3600); // 3600 seconds in 1 hour
  seconds = parseInt(seconds % 3600); // extract the remaining seconds after extracting hours

  // 3- Extract minutes:
  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute

  // 4- Keep only seconds not extracted to minutes:
  seconds = parseInt(seconds % 60);

  // 5 - Format so it shows a leading zero if needed
  let hoursStr = ("00" + hours).slice(-2);
  let minutesStr = ("00" + minutes).slice(-2);
  let secondsStr = ("00" + seconds).slice(-2);

  return hoursStr + ":" + minutesStr + ":" + secondsStr;
}
