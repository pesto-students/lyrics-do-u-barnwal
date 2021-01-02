function processSearch(ele) {
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

function showLoader() {
  hideInfoText();
  hideList();
  selectEleById("loader").style.display = "block";
}

function hideLoader() {
  selectEleById("loader").style.display = "none";
}

function showInfoText(text = "") {
  hideLoader();
  hideList();
  selectEleById("txtInfo").innerHTML = text;
  selectEleById("txtInfo").style.display = "block";
}

function hideInfoText() {
  selectEleById("txtInfo").style.display = "none";
}

function showList() {
  selectEleById("listSongs").style.display = "block";
}

function hideList() {
  selectEleById("listSongs").style.display = "none";
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
    '<img src="./assets/icons/play.png" title="Play Preview">' +
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
