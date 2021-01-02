var params = {};

function processLoadSong(name, artist) {
  showLoader();

  let url =
    "https://api.lyrics.ovh/v1/" +
    encodeURIComponent(artist) +
    "/" +
    encodeURIComponent(name);

  sendRequest(
    url,
    (res) => {
      if (res.lyrics == "")
        showInfoText("Lyrics not available for the selected song!");
      else showSong(res.lyrics);

      hideLoader();
    },
    () => showInfoText("Failed to load data!")
  );
}

// + Loader
function showLoader() {
  hideInfoText();
  hideSong();
  selectEleById("loader").style.display = "block";
}

function hideLoader() {
  selectEleById("loader").style.display = "none";
}

// + Info Text
function showInfoText(text = "") {
  hideLoader();
  hideSong();
  selectEleById("txtInfo").innerHTML = text;
  selectEleById("txtInfo").style.display = "block";
}

function hideInfoText() {
  selectEleById("txtInfo").style.display = "none";
}

// + Song
function showSong(lyrics) {
  selectEleById("txtSongName").innerHTML = params.name;
  selectEleById("txtSongAuthor").innerHTML = params.author;
  selectEleById("songText").innerHTML = lyrics;

  selectEleById("songTitle").style.display = "block";
  selectEleById("songText").style.display = "block";
}

function hideSong() {
  selectEleById("songTitle").style.display = "none";
  selectEleById("songText").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function (event) {
  params = getGETParams();

  if (!params.hasOwnProperty("name") || !params.hasOwnProperty("artist")) {
    location.replace("./");
    return;
  }

  processLoadSong(params.name, params.artist);
});
