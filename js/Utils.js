function sendRequest(
  reqURL,
  reqObj,
  positiveCallback,
  negativeCallback,
  showLoader = true
) {
  if (showLoader) showDefaultLoader();
  console.log("Request: ", reqObj);

  $.ajax({
    type: "POST",
    url: reqURL,
    data: JSON.stringify(reqObj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (res) {
      if (showLoader) hideDefaultLoader();
      console.log("Response: ", res);

      processServerResponse(res, positiveCallback, negativeCallback);
    },
    error: function (res) {
      if (showLoader) hideDefaultLoader();
      showUnexpectedError(JSON.stringify(res));
    },
  });
}

function processServerResponse(response, positiveCallback, negativeCallback) {
  if (response.prop.status == "success") {
    if (positiveCallback != null) positiveCallback(response.data);
  } else {
    if (negativeCallback != null) negativeCallback(response.data);
  }
}
