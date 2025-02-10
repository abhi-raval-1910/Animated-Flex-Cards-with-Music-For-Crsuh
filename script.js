document.addEventListener("DOMContentLoaded", () => {
    const musicButton = document.getElementById("music-button");
    const cards = document.querySelectorAll(".card");

    let audioFiles = {
        "music1.mp3": new Audio("music1.mp3"),
        "music2.mp3": new Audio("music2.wav"),
        "music3.mp3": new Audio("music3.mp3"),
        "music4.mp3": new Audio("music4.wav"),
        "music5.mp3": new Audio("music5.mp3")
    };

    let currentAudio = null;
    let isPlaying = false;

    // Add initial cross icon class to show muted state
    musicButton.classList.add("music-icon-muted");

    function toggleMusic(musicSrc) {
        if (!currentAudio || currentAudio.src !== audioFiles[musicSrc].src) {
            // Stop any currently playing audio
            if (currentAudio) currentAudio.pause();
            
            // Play new audio
            currentAudio = audioFiles[musicSrc];
            currentAudio.play();
            isPlaying = true;
            musicButton.classList.remove("music-icon-muted");
            musicButton.classList.add("music-icon-playing");
        } else {
            // Pause or resume the same audio
            if (isPlaying) {
                currentAudio.pause();
                isPlaying = false;
                musicButton.classList.remove("music-icon-playing");
                musicButton.classList.add("music-icon-muted");
            } else {
                currentAudio.play();
                isPlaying = true;
                musicButton.classList.remove("music-icon-muted");
                musicButton.classList.add("music-icon-playing");
            }
        }
    }

    musicButton.addEventListener("click", () => {
        const selectedCard = document.querySelector("input[name='slide']:checked + label");
        const musicSrc = selectedCard ? selectedCard.getAttribute("data-music") : null;
        
        if (musicSrc) {
            toggleMusic(musicSrc);
        }
    });

    // Play music when a card is clicked
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const musicSrc = card.getAttribute("data-music");
            toggleMusic(musicSrc);
        });
    });

    document.querySelectorAll("input[name='slide']").forEach(radio => {
        radio.addEventListener("change", () => {
            if (isPlaying) {
                const selectedCard = document.querySelector("input[name='slide']:checked + label");
                const musicSrc = selectedCard.getAttribute("data-music");
                toggleMusic(musicSrc);
            }
        });
    });
});
