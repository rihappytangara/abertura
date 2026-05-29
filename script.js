let queue = [];
let timerInterval;

async function loadParticipants() {
    const response = await fetch("./participants.json");
    const participants = await response.json();

    queue = participants.map((participant, index) => ({
        id: index + 1,
        name: participant.name,
        image: `assets/${participant.image}`
    }));

    render();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function render() {
    const featured = document.getElementById("featured");
    const queueEl = document.getElementById("queue");

    if (!queue.length) return;

    featured.innerHTML = `
        <div class="featured-card">
            <img src="${queue[0].image}" alt="${queue[0].name}">
            <div class="rank">1º Lugar Atual</div>
            <div class="name">${queue[0].name}</div>
        </div>
    `;

    queueEl.innerHTML = "";

    queue.slice(1,13).forEach((participant, index) => {
        const div = document.createElement("div");

        div.className = "small-card";

        div.innerHTML = `
            <img src="${participant.image}" alt="${participant.name}">
            <div class="rank">${index + 2}º</div>
            <div class="small-name">${participant.name}</div>
        `;

        queueEl.appendChild(div);
    });
}

document.getElementById("drawBtn").addEventListener("click", () => {
    shuffle(queue);
    render();
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (queue.length <= 1) return;

    const current = queue.shift();
    queue.push(current);

    render();
});

document.getElementById("timerBtn").addEventListener("click", () => {
    clearInterval(timerInterval);

    let remaining = 60;

    function updateTimer() {
        const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
        const seconds = String(remaining % 60).padStart(2, "0");

        document.getElementById("timer").textContent =
            `${minutes}:${seconds}`;

        if (remaining <= 0) {
            clearInterval(timerInterval);
            return;
        }

        remaining--;
    }

    updateTimer();

    timerInterval = setInterval(updateTimer, 1000);
});

loadParticipants();
