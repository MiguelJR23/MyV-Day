const gifStages = [
    "https://media.tenor.com/OI-Xn-5JTcEAAAAj/peach-goma-happy-side-to-side.gif",    // 0 gato normal
    "https://media1.tenor.com/m/s-4kvwARd0cAAAAC/garfield-sad.gif",  // 1 Garfield chuva
    "https://media1.tenor.com/m/Hr98vjSz-V8AAAAC/cat-kitty.gif",             // 2 Mais triste
    "https://media1.tenor.com/m/2Q-YesgvExEAAAAC/cat-d%E1%BB%97i.gif",             // 3 beiço
    "https://media1.tenor.com/m/HjjiNa3IcAoAAAAC/cute-plenty.gif",       // 4 Beeem triste
    "https://media1.tenor.com/m/ooUOJAfqWWwAAAAC/joker-eating-popcorn.gif",             // 5 🤡
]

const noMessages = [
    "Não",
    "Você tem certeza?🤔",
    "Tô ficando triste...🥺",
    "Beeem triste...🥀",
    "Puufavooor???",
    "Você não consegue me pegar mesmo🤡"
]

const yesTeasePokes = [
    "Ok, por essa eu não esperava, mas não quer ver o que acontece no 'Não'?",
    "Vai lá... Só pra ver...👀",
    "Tá me fazendo corar assim...",
    "Isso é teimosia ou é pra me deixar com vergonha?"
]

let yesTeasedCount = 0
let hideTimeout;
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const slider = document.getElementById("volume-slider");
const heart = document.querySelector(".heart-icon");
const control = document.getElementById("music-control");
const container = document.querySelector(".hearts-bg");
const popup = document.getElementById("volume-popup");
const themeBtn = document.getElementById("theme-toggle");

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 4000)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}


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

// carregar preferência salva
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☀️";
} else {
    themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    // troca emoji
    themeBtn.textContent = isLight ? "☀️" : "🌙";
    // salva preferência
    localStorage.setItem("theme", isLight ? "light" : "dark");
});