(async function ABLoopExtension() {
    // wait for Spicetify to load
    while (!Spicetify?.React || !Spicetify?.ReactDOM || !Spicetify?.Player || !Spicetify?.Topbar) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("All components ready!");

    const { Player, React, ReactDOM, Topbar, showNotification } = Spicetify;
    const { useState } = React;

    let pointA = null;
    let pointB = null;
    let isLooping = false;
    let checkInterval = null;


    function parseTimeToMs(timeString) {
        if (!timeString) return NaN;
        timeString = timeString.trim();
        let totalSeconds;
        if (timeString.includes(':')) {
            const parts = timeString.split(':');
            if (parts.length !== 2) return NaN;
            const minutes = parseFloat(parts[0]);
            const seconds = parseFloat(parts[1]);
            if (isNaN(minutes) || isNaN(seconds)) return NaN;
            totalSeconds = (minutes * 60) + seconds;
        } else {
            const seconds = parseFloat(timeString);
            if (isNaN(seconds)) return NaN;
            totalSeconds = seconds;
        }
        return totalSeconds * 1000;
    }


    function startLooping() {
        if (isLooping || pointA === null || pointB === null) return;
        isLooping = true;
        console.log(` Loop started: ${pointA/1000}s to ${pointB/1000}s`);

        Player.seek(pointA);
        if (checkInterval){
            checkInterval(checkInterval)
        }
        checkInterval = setInterval(() => {
            if (!isLooping) {
                clearInterval(checkInterval);
                checkInterval = null;
                return;
            }
            const currTime = Player.getProgress();

            if (currTime >= pointB - 50){
                console.log(`Looping back: ${currTime/1000}s -> ${pointA/1000}s`);
                Player.seek(pointA);
            }

            if (currTime < pointA -50){
                console.log('Outside looping range');
                Player.seek(pointA);
            }
        }, 100);
    }


    function stopLooping() {
        if (!isLooping) return;
        if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
        }
        isLooping = false;
        pointA = null;
        pointB = null;
        console.log('Looping stopped.');
    }


    function setLoopPoints() {
        if (isLooping) {
            showNotification("Stop the current loop first!");
            return;
        }
        
        const input = prompt("Enter loop points (e.g., 1:30-2:45 or 90-165):");
        if (!input) {
            console.log("Loop setup cancelled.");
            return;
        }
        
        const timeParts = input.split("-");
        if (timeParts.length !== 2) {
            showNotification("Invalid format. Use: start-end");
            return;
        }
        
        pointA = parseTimeToMs(timeParts[0]);
        pointB = parseTimeToMs(timeParts[1]);
        
        if (isNaN(pointA) || isNaN(pointB)) {
            showNotification("Invalid time format.");
            return;
        }
        if (pointA >= pointB) {
            showNotification("Start must be before end.");
            return;
        }
        
        startLooping();
    }


    Player.addEventListener('songchange', stopLooping);

    //button in the top bar
    const button = new Topbar.Button(
        "AB Loop",
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"/>
            <polyline points="17 8 21 12 17 16"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <path d="M3 10V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/>
            <polyline points="7 16 3 12 7 8"/>
        </svg>`,
        () => {
            if (isLooping) {
                stopLooping();
            } else {
                setLoopPoints();
            }
        },
        false
    );

    console.log("AB Loop Extension loaded successfully!");
})();

// SPICETIFY TOOLS
// Spicetify.Player
// Spicetify.platform
// Spicetify.Player.getProgress -> gets playback position
// Spicetify.Player.seek(Time) -> jumps to a timestamp
// Spicetify.Player.addEventListener('songchange', callback) -> detects song change

