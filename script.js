document.addEventListener("DOMContentLoaded", () => {
    const musicButton = document.getElementById("music-button");
    const cards = document.querySelectorAll(".card");
    let currentAudio = new Audio();
    let isPlaying = false; // Track if music is currently playing

    // Preload all audio files and set them to loop
    const audioFiles = {
        "music1.mp3": new Audio("music1.mp3"),
        "music2.mp3": new Audio("music2.wav"),
        "music3.mp3": new Audio("music3.mp3"),
        "music4.mp3": new Audio("music4.wav"),
        "music5.mp3": new Audio("music5.mp3")
    };

    Object.values(audioFiles).forEach(audio => {
        audio.loop = true; // Set all audios to loop
    });

    // Function to play music based on the selected card
    function playMusic(musicSrc) {
        if (currentAudio.src !== audioFiles[musicSrc].src) { // Check if new music needs to be played
            currentAudio.pause(); // Pause currently playing music
            currentAudio = audioFiles[musicSrc]; // Load the preloaded music
            currentAudio.currentTime = 0; // Reset to start
            currentAudio.play(); // Play the new music
        }
    }

    // Play button to start or pause the music initially
    musicButton.addEventListener("click", () => {
        const selectedCard = document.querySelector("input[name='slide']:checked + label");
        const musicSrc = selectedCard.getAttribute("data-music");

        if (!isPlaying) {
            playMusic(musicSrc); // Start playing music when the button is first clicked
            isPlaying = true; // Music is now playing
        } else {
            currentAudio.pause(); // Pause if already playing
            isPlaying = false; // Music is now paused
        }
    });

    // Auto change music when switching between videos
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const musicSrc = card.getAttribute("data-music");
            if (isPlaying) {
                playMusic(musicSrc); // Automatically change music when video changes
            }
        });
    });

    // Ensure music changes when switching between videos by radio button change
    document.querySelectorAll("input[name='slide']").forEach(radio => {
        radio.addEventListener("change", () => {
            if (isPlaying) {
                const selectedCard = document.querySelector("input[name='slide']:checked + label");
                const musicSrc = selectedCard.getAttribute("data-music");
                playMusic(musicSrc); // Change music when the selected radio button changes
            }
        });
    });
});
