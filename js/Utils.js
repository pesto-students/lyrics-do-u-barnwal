var xhttp = new XMLHttpRequest();

function sendRequest(reqURL, positiveCallback, negativeCallback) {
  console.log("request:", reqURL);

  xhttp.abort();

  let onFailure = () => {
    processServerResponse(
      { status: "failure", data: [] },
      positiveCallback,
      negativeCallback
    );
  };

  let onSuccess = (response) => {
    processServerResponse(
      { status: "success", ...JSON.parse(response) },
      positiveCallback,
      negativeCallback
    );
  };

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      let response = xhttp.responseText;

      if (!response || response == "") onFailure();
      else onSuccess(response);
    }
  };

  xhttp.onerror = onFailure;

  xhttp.ontimeout = onFailure;

  xhttp.open("GET", reqURL, true);

  xhttp.send();
}

function processServerResponse(response, positiveCallback, negativeCallback) {
  console.log("response:", response);

  if (response.status == "success") {
    if (positiveCallback != null) positiveCallback(response);
  } else {
    if (negativeCallback != null) negativeCallback(response);
  }
}

function selectEleById(idText) {
  return document.getElementById(idText);
}

function selectEleByClass(classText) {
  return document.getElementsByClassName(classText);
}
