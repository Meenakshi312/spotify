document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.b'); // Select all boxes
    const audios = document.querySelectorAll('audio'); // Select all audio elements

    boxes.forEach((box, index) => {
        const audio = audios[index];
        const timebar = box.querySelector('.timebox, .timebox2, .timebox3, .timebox4'); // Select any timebox variant inside the box
        const progressbar = timebar.querySelector('.progress'); // Get the progress bar inside the selected timebox

        if (!timebar || !progressbar) return; // Skip if no timebox is found in this box

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
                // Pause all other audios before playing the selected one
                audios.forEach((a, i) => {
                    if (i !== index) {
                        a.pause();
                    }
                });
                audio.play();
            }
            isPlaying = !isPlaying;
        });

        // Reset isPlaying when the song ends
        audio.addEventListener('ended', function () {
            isPlaying = false;
        });
    });
});
