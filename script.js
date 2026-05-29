const TOTAL_PARTICIPANTS = 40; // ajuste conforme necessário

let queue = [];
let timerInterval;

function buildParticipants(){
  queue = [];
  for(let i=1;i<=TOTAL_PARTICIPANTS;i++){
    queue.push({
      id:i,
      image:`assets/${i}.png`
    });
  }
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

function render(){
  const featured=document.getElementById('featured');
  const queueEl=document.getElementById('queue');

  if(!queue.length) return;

  featured.innerHTML=`
    <div class="featured-card">
      <img src="${queue[0].image}" alt="Participante">
      <div class="rank">Posição Atual: 1º</div>
    </div>`;

  queueEl.innerHTML='';
  queue.slice(1).forEach((p,index)=>{
    const div=document.createElement('div');
    div.className='small-card';
    div.innerHTML=`
      <img src="${p.image}">
      <div class="rank">${index+2}º</div>`;
    queueEl.appendChild(div);
  });
}

document.getElementById('drawBtn').onclick=()=>{
  buildParticipants();
  shuffle(queue);
  render();
};

document.getElementById('nextBtn').onclick=()=>{
  if(queue.length<2) return;
  queue.push(queue.shift());
  render();
};

document.getElementById('timerBtn').onclick=()=>{
  clearInterval(timerInterval);
  let remaining=60;

  function update(){
    const m=String(Math.floor(remaining/60)).padStart(2,'0');
    const s=String(remaining%60).padStart(2,'0');
    document.getElementById('timer').textContent=`${m}:${s}`;

    if(remaining===0){
      clearInterval(timerInterval);
      return;
    }
    remaining--;
  }

  update();
  timerInterval=setInterval(update,1000);
};

buildParticipants();
render();
