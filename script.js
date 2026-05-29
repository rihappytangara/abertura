
let queue=[];
async function loadParticipants(){
const response=await fetch('./assets/participants.json');
const participants=await response.json();
queue=participants.map((p,i)=>({id:i+1,name:p.name,image:`assets/${p.image}`}));
render();
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}
function render(){
if(!queue.length)return;
document.getElementById('featured').innerHTML=`<div class="featured-card"><img src="${queue[0].image}"><div class="name">${queue[0].name}</div></div>`;
const q=document.getElementById('queue');q.innerHTML='';
queue.slice(1,10).forEach((p,i)=>{
const d=document.createElement('div');
d.className='small-card';
d.innerHTML=`<img src="${p.image}"><div class="small-name">${i+2}º ${p.name}</div>`;
q.appendChild(d);
});
const r=document.getElementById('ranking');
r.innerHTML='<div class="ranking-title">ORDEM COMPLETA</div>';
queue.forEach((p,i)=>{
const d=document.createElement('div');
d.className='rank-row'+(i===0?' active':'');
d.textContent=(i===0?'▶ ':'')+(i+1)+'º '+p.name;
r.appendChild(d);
});
}
document.getElementById('drawBtn').onclick=()=>{shuffle(queue);render();};
document.getElementById('nextBtn').onclick=()=>{queue.push(queue.shift());render();};
const t=document.getElementById('timerBtn'); if(t) t.style.display='none';
loadParticipants();
document.getElementById("fullscreenBtn").onclick = () => {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }

};
