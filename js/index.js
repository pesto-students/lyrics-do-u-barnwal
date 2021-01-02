var previewAudio = new Audio();
var previousURL = "";
var nextURL = "";

function processSearch(url = "") {
  stopPreview();

  let ele = selectEleById("inputKeyword");
  url = url != "" ? url : "https://api.lyrics.ovh/suggest/" + ele.value;

  if (ele.value == "") {
    showInfoText("Go head search for something!");
    return;
  }

  showLoader();

  sendRequest(
    url,
    (res) => {
      if (res.data.length <= 0)
        showInfoText("No record found matching the searched keyword, sorry!");
      else {
        previousURL = res.hasOwnProperty("prev") ? res.prev : "";
        nextURL = res.hasOwnProperty("next") ? res.next : "";

        populateList(res.data);
        showList();
      }

      hideLoader();
    },
    () => showInfoText("Failed to load data!")
  );
}

// + Loader
function showLoader() {
  hideInfoText();
  hideList();
  selectEleById("loader").style.display = "block";
}

function hideLoader() {
  selectEleById("loader").style.display = "none";
}

// + Info Text
function showInfoText(text = "") {
  hideLoader();
  hideList();
  selectEleById("txtInfo").innerHTML = text;
  selectEleById("txtInfo").style.display = "block";
}

function hideInfoText() {
  selectEleById("txtInfo").style.display = "none";
}

// + Pagination
function showPagination(text = "") {
  if (previousURL == "")
    selectEleById("btnPrevious").setAttribute("disabled", true);
  else selectEleById("btnPrevious").removeAttribute("disabled");

  if (nextURL == "") selectEleById("btnNext").setAttribute("disabled", true);
  else selectEleById("btnNext").removeAttribute("disabled");

  selectEleById("pagination").style.display = "block";
}

function hidePagination() {
  selectEleById("pagination").style.display = "none";
}

// + List
function showList() {
  selectEleById("listSongs").style.display = "block";
  showPagination();
}

function hideList() {
  selectEleById("listSongs").style.display = "none";
  hidePagination();
}

function populateList(songs = []) {
  let list = selectEleById("listSongs");

  list.innerHTML = "";

  songs.forEach((s) => (list.innerHTML += generateSingleSongItem(s)));
}

function generateSingleSongItem(song = {}) {
  return (
    '<div class="single-song">' +
    '<div class="album">' +
    ('<img src="' + song.album.cover_medium + '">') +
    '<div class="overlay">' +
    ('<img class="imgPlayPausePreview" src="./assets/icons/play.png" title="Play Preview" onclick="playPreview(this, \'' +
      song.preview +
      "')\">") +
    "</div>" +
    "</div>" +
    '<div class="description">' +
    '<div class="artist">' +
    ('<img src="' + song.artist.picture_medium + '">') +
    ('<h5><a href="?q=' +
      fixedEncodeURIComponent(song.artist.name) +
      '">' +
      song.artist.name +
      "</a></h5>") +
    "</div>" +
    ("<h3><a>" + song.title + "</a></h3>") +
    ('<p><a href="?q=' +
      fixedEncodeURIComponent(song.album.title) +
      '">' +
      song.album.title +
      "</a></p>") +
    "</div>" +
    '<div class="actions">' +
    ("<a href='./song.html?name=" +
      fixedEncodeURIComponent(song.title) +
      "&artist=" +
      fixedEncodeURIComponent(song.artist.name) +
      '\'" class="btn">Show Lyrics</a>') +
    "</div>" +
    "</div>"
  );
}

function gotoPreviousPage() {
  if (previousURL != "")
    processSearch("https://cors-anywhere.herokuapp.com/" + previousURL);
}

function gotoNextPage() {
  if (nextURL != "")
    processSearch("https://cors-anywhere.herokuapp.com/" + nextURL);
}

function playPreview(ele, audioURL) {
  let elements = selectEleByClass("imgPlayPausePreview");

  stopPreview();

  if (ele.src.includes("pause.png")) {
    ele.setAttribute("src", "./assets/icons/play.png");
    return;
  }

  for (let i = 0; i < elements.length; i++)
    elements[i].setAttribute("src", "./assets/icons/play.png");

  ele.setAttribute("src", "./assets/icons/pause.png");

  previewAudio.src = audioURL;
  previewAudio.play();
}

function stopPreview() {
  previewAudio.pause();
  previewAudio.currentTime = 0;
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

document.addEventListener("DOMContentLoaded", function (event) {
  let params = getGETParams();

  if (params.hasOwnProperty("q")) {
    selectEleById("inputKeyword").value = params.q;
    processSearch();
  }
});
