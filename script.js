
let queue=[];

async function loadParticipants(){
 const response=await fetch('./assets/participants.json');
 const participants=await response.json();

 queue=participants.map((p,i)=>({
   id:i+1,
   name:p.name,
   image:`assets/${p.image}`
 }));

 render();
}

function shuffle(arr){
 for(let i=arr.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [arr[i],arr[j]]=[arr[j],arr[i]];
 }
}

function render(){
 if(!queue.length) return;

 document.getElementById('featured').innerHTML=`
 <div class="featured-card">
   <img src="${queue[0].image}" alt="${queue[0].name}">
   <div class="name">${queue[0].name}</div>
 </div>`;

 const q=document.getElementById('queue');
 q.innerHTML='';

 queue.slice(1,10).forEach((p,i)=>{
   const d=document.createElement('div');
   d.className='small-card'+(i===0?' next-up':'');
   d.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <div class="small-name">${i+2}º ${p.name}</div>`;
   q.appendChild(d);
 });

 const r=document.getElementById('ranking');
 r.innerHTML='<div class="ranking-title">ORDEM COMPLETA</div>';

 queue.forEach((p,i)=>{
   const row=document.createElement('div');
   row.className='rank-row'+(i===0?' active':'');
   row.id=i===0?'currentParticipant':'';
   row.textContent=(i===0?'▶ ':'')+(i+1)+'º '+p.name;
   r.appendChild(row);
 });

 const current=document.getElementById('currentParticipant');
 if(current){
   current.scrollIntoView({behavior:'smooth',block:'center'});
 }
}

document.getElementById('drawBtn').onclick=()=>{
 shuffle(queue);
 render();
};

document.getElementById('nextBtn').onclick=()=>{
 queue.push(queue.shift());
 render();
};

document.getElementById('fullscreenBtn').onclick=()=>{
 if(!document.fullscreenElement){
   document.documentElement.requestFullscreen();
 }else{
   document.exitFullscreen();
 }
};

const timerBtn=document.getElementById('timerBtn');
const timer=document.getElementById('timer');
if(timerBtn) timerBtn.style.display='none';
if(timer) timer.style.display='none';

document.addEventListener('keydown',(e)=>{
 if(e.code==='Space'){
   e.preventDefault();
   document.getElementById('nextBtn').click();
 }
});

loadParticipants();
