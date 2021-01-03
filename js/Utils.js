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
      { ...JSON.parse(response), status: "success" },
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

  // xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhttp.send();
}

function processServerResponse(response, positiveCallback, negativeCallback) {
  console.log("response:", response);

  if (response.hasOwnProperty("contents"))
    response = { status: response.status, ...response.contents };

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

function getGETParams() {
  const params = {};

  let raw = window.location.href.split("?");

  if (raw.length > 1) {
    raw = raw[1].split("&");

    raw.forEach((pair) => {
      pair = pair.split("=");

      if (pair.length > 1) {
        params[pair[0]] = decodeURI(pair[1]);
      }
    });
  }

  return params;
}
