function sendRequest(reqURL, positiveCallback, negativeCallback) {
  let xhttp = new XMLHttpRequest();

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
  if (response.status == "success") {
    if (positiveCallback != null) positiveCallback(response.data);
  } else {
    if (negativeCallback != null) negativeCallback(response.data);
  }
}
