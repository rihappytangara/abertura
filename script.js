let queue=[];

async function loadParticipants(){
 const response=await fetch('./assets/participants.json');
 const participants=await response.json();

 queue=participants.map((p,i)=>({
   id:i+1,
   name:p.name,
   image:`assets/${p.image}`,
   abandoned:false
 }));

 loadAbandoned();
 renderPilotList();
 render();
}

function loadAbandoned(){
 const saved=JSON.parse(localStorage.getItem('abandonedPilots')||'[]');
 queue.forEach(p=>p.abandoned=saved.includes(p.id));
}

function saveAbandoned(){
 localStorage.setItem('abandonedPilots',JSON.stringify(queue.filter(p=>p.abandoned).map(p=>p.id)));
}

function renderPilotList(){
 const c=document.getElementById('pilotList');
 c.innerHTML='';
 queue.forEach(p=>{
  const d=document.createElement('div');
  d.innerHTML=`<label><input type="checkbox" ${p.abandoned?'checked':''} onchange="toggleAbandoned(${p.id})"> ${p.name}</label>`;
  c.appendChild(d);
 });
}

function toggleAbandoned(id){
 const p=queue.find(x=>x.id===id);
 p.abandoned=!p.abandoned;
 saveAbandoned();
 render();
}

window.toggleAbandoned=toggleAbandoned;

function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}}

function overlay(p){return p.abandoned?'<img class="overlay" src="assets/abandonou.png">':'';}

function render(){
 if(!queue.length) return;

 document.getElementById('featured').innerHTML=`<div class="featured-card">
 <img class="mainimg" src="${queue[0].image}">${overlay(queue[0])}
 <div class="name">${queue[0].name}</div></div>`;

 const q=document.getElementById('queue'); q.innerHTML='';
 queue.slice(1,10).forEach((p,i)=>{
  const d=document.createElement('div');
  d.className='small-card'+(i===0?' next-up':'');
  d.innerHTML=`<img class="mainimg" src="${p.image}">${overlay(p)}<div class="small-name">${i+2}º ${p.name}</div>`;
  q.appendChild(d);
 });

 const r=document.getElementById('ranking');
 r.innerHTML='<div class="ranking-title">ORDEM COMPLETA</div>';
 queue.forEach((p,i)=>{
  const row=document.createElement('div');
  row.className='rank-row'+(i===0?' active':'');
  row.textContent=(i+1)+'º '+p.name+(p.abandoned?' (ABANDONOU)':'');
  r.appendChild(row);
 });
}

document.getElementById('drawBtn').onclick=()=>{shuffle(queue);render();};
document.getElementById('nextBtn').onclick=()=>{queue.push(queue.shift());render();};
document.getElementById('fullscreenBtn').onclick=()=>{
 if(!document.fullscreenElement) document.documentElement.requestFullscreen();
 else document.exitFullscreen();
};

loadParticipants();