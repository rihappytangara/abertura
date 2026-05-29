
// ADICIONE AO FINAL DO SEU script.js

document.getElementById("fullscreenBtn").onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){
        e.preventDefault();
        document.getElementById('nextBtn').click();
    }
});

// Ao final da função render():
const current = document.getElementById('currentParticipant');
if(current){
    current.scrollIntoView({
        behavior:'smooth',
        block:'center'
    });
}
