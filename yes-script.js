let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

const popup = document.getElementById("volume-popup");
const control = document.getElementById("music-control");
const music = document.getElementById('bg-music')
const slider = document.getElementById("volume-slider");

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.innerText = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";

    const duration = 4 + Math.random() * 4;
    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 300);

slider.addEventListener("input", () => {
    const value = slider.value;
    // volume
    music.volume = value / 100;
    // escala do coração (0.5 até 1.5)
    const scale = 0.5 + (value / 100);
    heart.style.transform = `scale(${scale})`;
    // opacidade
    heart.style.opacity = 0.5 + (value / 200);
});

document.getElementById("music-toggle").addEventListener("click", () => {
    control.classList.toggle("active");
});

// quando entra na área do botão
control.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    control.classList.add("active");
});

// quando sai da área do botão
control.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
        control.classList.remove("active");
    }, 2500); // tempo que ele continua visível (2.5s)
});

function showPopup() {
    clearTimeout(hideTimeout);
    control.classList.add("active");
}

function hidePopupWithDelay() {
    hideTimeout = setTimeout(() => {
        control.classList.remove("active");
    }, 2500);
}

control.addEventListener("mouseenter", showPopup);
control.addEventListener("mouseleave", hidePopupWithDelay);
popup.addEventListener("mouseenter", showPopup);
popup.addEventListener("mouseleave", hidePopupWithDelay);
slider.addEventListener("input", showPopup);