console.log("Lets write JavaScript");
let currentSong = new Audio();
let play = document.querySelector(".playSongButton")
let previous = document.querySelector(".prevSongButton")
let next = document.querySelector(".nextSongButton")

async function fetchSongs() {
  let a = await fetch("http://127.0.0.1:5500/Songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/Songs/")[1]);
    }
  }
  return songs;
}

// -----------------------scroll BTN---------------------------
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.playlist').forEach(function(playlist) {
    const container = playlist.querySelector('.cardContainer');
    const leftBtn = playlist.querySelector('.leftBtn');
    const rightBtn = playlist.querySelector('.rightBtn');
    if (leftBtn && rightBtn && container) {
      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.artistCardSection').forEach(function(playlist) {
    const container = playlist.querySelector('.artistCardContainer');
    const leftBtn = playlist.querySelector('.leftBtn');
    const rightBtn = playlist.querySelector('.rightBtn');
    if (leftBtn && rightBtn && container) {
      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });
});
// -----------------------scroll BTN---------------------------

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/Songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }
  document.querySelector(".currentSongInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function getSongs() {
  let songs = await fetchSongs();
  console.log(songs);

  let songListLeft = document
    .querySelector(".leftPlaylist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songListLeft.innerHTML =
      songListLeft.innerHTML +
      `<li data-filename="${song}"><i class="fa-solid fa-music"></i>
                            <div class="info">
                                <div class="songName"> ${song.replaceAll(
                                  "_",
                                  " "
                                )}</div>
                                <div class="artistName">-Artist</div>
                            </div>
                            <div class="playnow">
                                <i class="fa-regular fa-circle-play"></i>
                            </div> </li>`;
  }

  Array.from(
    document.querySelector(".leftPlaylist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      // playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
      playMusic(e.getAttribute("data-filename"));
    });
  });



  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });
      // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

  //   for (const element of songs) {

  //       // Step 1: Get the file name
  //         let fileName = decodeURIComponent(element.split("/").pop());

  //         // Step 2: Remove extension
  //         fileName = fileName.replace(".mp3", "");

  //         // Step 3: Replace underscores with spaces
  //         const songName = fileName.replace(/_/g, " ");

  //         console.log(songName);
  //   }

  let audio = new Audio(songs[0]);
  // audio.play()
  // audio.addEventListener("loadeddata", )
  //   let duration = audio.duration;
  //   console.log(duration)

  // const randomIndex = Math.floor(Math.random() * songs.length);
  // const selectedSong = songs[randomIndex];

  // const audio = new Audio(selectedSong);
  // try {
  //   await audio.play();
  //   console.log("Playing:", selectedSong);
  // } catch (err) {
  //   console.error("Playback failed:", err);
  // }
}
getSongs();
