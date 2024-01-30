async function main() {
    await getSongs("song/ncs")

    playMusic(songs[0], true)

    displayAlbums()

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "img/pause.svg"
        } else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration) * (percent) / 100
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-129%"
    })

    previous.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.findIndex(song => song.url === currentsong.src);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1].url)
        }
    })

    next.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.findIndex(song => song.url === currentsong.src);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1].url)
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
            currentsong.volume = .10;
        }
    })
}

main()
