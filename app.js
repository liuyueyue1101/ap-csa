const D=window.COURSE_DATA;
const lessons=D.lessons;
const doneKey='apcsa-progress';
const legacyDoneKey='oscar-apcsa-progress';
if(!localStorage.getItem(doneKey) && localStorage.getItem(legacyDoneKey)) localStorage.setItem(doneKey,localStorage.getItem(legacyDoneKey));
const studentKey='apcsa-student-name';
const getStudentName=()=>localStorage.getItem(studentKey)?.trim()||'';
const getDone=()=>new Set(JSON.parse(localStorage.getItem(doneKey)||'[]'));
const saveDone=s=>localStorage.setItem(doneKey,JSON.stringify([...s]));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const phaseOrder=['Foundation','Unit 1','Unit 2','Unit 3','Unit 4','Exam Mode'];

function firstIncomplete(done){
  return lessons.find(x=>!done.has(x.id)) || lessons[lessons.length-1];
}
function phaseLabel(phase){
  if(phase==='Foundation') return 'Foundation warm-up';
  if(phase==='Exam Mode') return 'Exam mode';
  const n=phase.split(' ')[1];
  return `${phase} · ${D.units[n]?.title||''}`;
}
function renderNav(){
  const done=getDone();
  const current=firstIncomplete(done);
  const q=(document.querySelector('#navSearch').value||'').trim().toLowerCase();
  const nav=document.querySelector('#courseNav');
  nav.innerHTML='';

  phaseOrder.forEach(phase=>{
    const phaseLessons=lessons.filter(x=>x.phase===phase);
    if(!phaseLessons.length) return;
    const phaseMatches=!q || phaseLessons.some(x=>(x.title+' '+x.apTopic+' '+x.subtitle).toLowerCase().includes(q));
    if(!phaseMatches) return;

    const group=document.createElement('section');
    group.className='nav-group';
    const isCurrentPhase=current.phase===phase;
    const head=document.createElement('button');
    head.className='nav-group-head'+(isCurrentPhase?' current':'');
    head.innerHTML=`<span class="chev">${isCurrentPhase||q?'▾':'▸'}</span><span>${esc(phaseLabel(phase))}</span><span class="nav-count">${phaseLessons.filter(x=>done.has(x.id)).length}/${phaseLessons.length}</span>`;
    group.appendChild(head);

    const body=document.createElement('div');
    body.className='nav-group-body';
    if(!isCurrentPhase&&!q) body.hidden=true;
    const weeks=[...new Set(phaseLessons.map(x=>x.week))];

    weeks.forEach(w=>{
      const wl=phaseLessons.filter(x=>x.week===w);
      const matches=!q||wl.some(x=>(x.title+' '+x.apTopic+' '+x.subtitle).toLowerCase().includes(q));
      if(!matches) return;
      const week=document.createElement('div');
      week.className='nav-week';
      const open=isCurrentPhase && current.week===w || q;
      const wh=document.createElement('button');
      wh.className='nav-week-head'+(current.week===w?' current':'');
      wh.innerHTML=`<span class="chev">${open?'▾':'▸'}</span><span>Week ${w}</span>`;
      const list=document.createElement('div');
      list.className='nav-lessons';
      list.hidden=!open;
      wl.forEach(x=>{
        if(q && !(x.title+' '+x.apTopic+' '+x.subtitle).toLowerCase().includes(q)) return;
        const a=document.createElement('a');
        a.href=`lesson.html?id=${encodeURIComponent(x.id)}`;
        a.className='nav-lesson'+(x.id===current.id?' active':'')+(done.has(x.id)?' complete':'');
        a.innerHTML=`<span class="lesson-status">${done.has(x.id)?'✓':x.id===current.id?'→':'○'}</span><span><b>${esc(x.title)}</b><small>${esc(x.sessionInWeek)} · ${esc(x.apTopic)}</small></span>`;
        list.appendChild(a);
      });
      wh.onclick=()=>{list.hidden=!list.hidden;wh.querySelector('.chev').textContent=list.hidden?'▸':'▾';};
      week.append(wh,list); body.appendChild(week);
    });
    head.onclick=()=>{body.hidden=!body.hidden;head.querySelector('.chev').textContent=body.hidden?'▸':'▾';};
    group.appendChild(body); nav.appendChild(group);
  });
}
function renderMain(){
  const done=getDone(), current=firstIncomplete(done);
  const doneCount=done.size;
  document.querySelector('#progressText').textContent=`${doneCount} / ${lessons.length} completed`;
  document.querySelector('#progressFill').style.width=`${Math.round(doneCount/lessons.length*100)}%`;
  document.querySelector('#todayLabel').textContent=phaseLabel(current.phase).toUpperCase();
  document.querySelector('#currentTitle').textContent='Continue learning';

  const cp=document.querySelector('#continuePanel');
  cp.innerHTML=`
    <div class="continue-copy">
      <p class="lesson-kicker">Week ${current.week} · ${esc(current.sessionInWeek)} · ${esc(current.apTopic)}</p>
      <h2>${esc(current.title)}</h2>
      <p>${esc(current.subtitle||'')}</p>
      <div class="continue-actions">
        <a class="primary-action" href="lesson.html?id=${encodeURIComponent(current.id)}">Start lesson <span>→</span></a>
        <span class="muted">Continue in sequence; weekdays can move.</span>
      </div>
    </div>`;

  document.querySelector('#weekTitle').textContent=`Week ${current.week} · ${phaseLabel(current.phase)}`;
  const list=document.querySelector('#currentWeekList');
  const weekLessons=lessons.filter(x=>x.week===current.week);
  list.innerHTML=weekLessons.map((x,idx)=>`
    <a class="lesson-row ${done.has(x.id)?'done':''} ${x.id===current.id?'current':''}" href="lesson.html?id=${encodeURIComponent(x.id)}">
      <span class="row-index">${done.has(x.id)?'✓':String(idx+1).padStart(2,'0')}</span>
      <span class="row-main"><b>${esc(x.title)}</b><small>${esc(x.sessionInWeek)} · ${esc(x.apTopic)}</small></span>
      <span class="row-arrow">→</span>
    </a>`).join('');
}
function renderResources(){
 const core=[
  ['Official AP CSA Course & Exam Description',D.resources.ced,'Official'],
  ['AP CSA exam page & current format',D.resources.exam,'Official'],
  ['CSAwesome2 — free curriculum',D.resources.csawesome,'Free course'],
  ['Current-framework video tutorials',D.resources.codehs,'Free video'],
  ['Official 2026 released FRQs',D.resources.frq2026,'Official practice'],
  ['Past FRQs & scoring information',D.resources.frq,'Official practice'],
  ['Bluebook',D.resources.bluebook,'Official'],
  ['Java Quick Reference / reference information',D.resources.reference,'Official']
 ];
 document.querySelector('#resourcesList').innerHTML=core.map(r=>`<a class="plain-resource" target="_blank" rel="noopener" href="${r[1]}"><span><b>${esc(r[0])}</b><small>${r[2]}</small></span><span>↗</span></a>`).join('');
}
function init(){
  renderNav(); renderMain(); renderResources();
  const studentInput=document.querySelector('#studentNameInput');
  studentInput.value=getStudentName();
  studentInput.addEventListener('change',()=>localStorage.setItem(studentKey,studentInput.value.trim()));
  document.querySelector('#navSearch').addEventListener('input',renderNav);
  document.querySelector('#showResources').onclick=()=>{document.querySelector('#resourcesDrawer').hidden=false;document.querySelector('#resourcesDrawer').scrollIntoView({behavior:'smooth'});};
  document.querySelector('#closeResources').onclick=()=>document.querySelector('#resourcesDrawer').hidden=true;
  document.querySelector('#markReset').onclick=()=>{if(confirm('Clear completion marks saved in this browser?')){localStorage.removeItem(doneKey);renderNav();renderMain();}};
  document.querySelector('#mobileMenu').onclick=()=>document.querySelector('#sidebar').classList.toggle('open');
}
init();