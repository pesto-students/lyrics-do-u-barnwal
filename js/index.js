var previewAudio = new Audio();

function processSearch() {
  stopPreview();

  let ele = selectEleById("inputKeyword");

  if (ele.value == "") {
    showInfoText("Go head search for something!");
    return;
  }

  showLoader();

  sendRequest(
    "https://api.lyrics.ovh/suggest/" + ele.value,
    (res) => {
      if (res.data.length <= 0)
        showInfoText("No record found matching the searched keyword, sorry!");
      else {
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
    ('<h5><a href="#">' + song.artist.name + "</a></h5>") +
    "</div>" +
    ('<h3><a href="#">' + song.title + "</a></h3>") +
    ('<p><a href="#">' + song.album.title + "</a></p>") +
    "</div>" +
    '<div class="actions">' +
    '<button class="btn">Show Lyrics</button>' +
    "</div>" +
    "</div>"
  );
}

function playPreview(ele, audioURL) {
  let elements = selectEleByClass("imgPlayPausePreview");

  for (let i = 0; i < elements.length; i++)
    elements[i].setAttribute("src", "./assets/icons/play.png");

  ele.setAttribute("src", "./assets/icons/pause.png");

  stopPreview();

  previewAudio.src = audioURL;
  previewAudio.play();
}

function stopPreview() {
  previewAudio.pause();
  previewAudio.currentTime = 0;
}
