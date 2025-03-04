document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.b');
    const audio = document.getElementById('song'); // Corrected ID selection
    const timebar = document.querySelector('.timebox'); // Corrected class selection
    const progressbar = document.querySelector('.progress'); // Corrected class selection

    // Update progress bar when audio plays
    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressbar.style.width = `${progressPercent}%`;
    });

    // Seek functionality on clicking timebar
    timebar.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the event from bubbling to 'box'
        
        const timelineWidth = timebar.offsetWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / timelineWidth) * duration;
    });

    let isPlaying = false;

    // Play/Pause functionality on clicking 'box' (excluding timebar)
    box.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
    });

    // Reset isPlaying when the song ends
    audio.addEventListener('ended', function () {
        isPlaying = false;
    });
});
