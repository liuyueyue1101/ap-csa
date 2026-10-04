const D=window.COURSE_DATA; const lessons=D.lessons;
const doneKey='oscar-apcsa-progress';
const getDone=()=>new Set(JSON.parse(localStorage.getItem(doneKey)||'[]'));
const saveDone=s=>localStorage.setItem(doneKey,JSON.stringify([...s]));
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function init(){
 document.querySelector('#lessonCount').textContent=lessons.length;
 document.querySelector('#weeksCount').textContent=Math.ceil(lessons.length/4);
 const target=new Date(D.examDate+'T12:00:00'); const now=new Date(); const days=Math.max(0,Math.ceil((target-now)/86400000)); document.querySelector('#countdown').textContent=days;
 const uc=document.querySelector('#unitCards'); Object.entries(D.units).forEach(([n,u])=>{uc.insertAdjacentHTML('beforeend',`<div class="card unit-card" style="--u:${u.color}"><span class="weight">${u.weight} MCQ</span><h3>Unit ${n}: ${u.title}</h3><p class="muted">Required current AP CSA unit.</p></div>`)});
 renderWeeks();
 const core=[['Official AP CSA Course & Exam Description',D.resources.ced,'Official'],['AP CSA exam page & current format',D.resources.exam,'Official'],['CSAwesome2 — College Board-endorsed free curriculum',D.resources.csawesome,'Free course'],['Current-framework CodeHS video tutorials',D.resources.codehs,'Free video'],['Official 2026 released FRQs',D.resources.frq2026,'Official practice'],['Past FRQs & scoring information',D.resources.frq,'Official practice'],['Bluebook',D.resources.bluebook,'Official'],['AP reference information / Java Quick Reference',D.resources.reference,'Official']];
 document.querySelector('#resourcesList').innerHTML=core.map(r=>`<div class="resource"><span class="kind">${r[2]}</span><a href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a></div>`).join('');
 document.querySelector('#phaseFilter').addEventListener('change',renderWeeks);document.querySelector('#search').addEventListener('input',renderWeeks);
 document.querySelector('#clearProgress').onclick=()=>{if(confirm('Clear completion marks saved in this browser?')){localStorage.removeItem(doneKey);renderWeeks();}};
}
function renderWeeks(){const phase=document.querySelector('#phaseFilter').value;const q=document.querySelector('#search').value.toLowerCase().trim();const done=getDone();const wrap=document.querySelector('#weeks');wrap.innerHTML='';const max=Math.ceil(lessons.length/4);
 for(let w=1;w<=max;w++){let arr=lessons.filter(x=>x.week===w);const visible=arr.filter(x=>(phase==='all'||x.phase===phase)&&(!q||(x.title+' '+x.subtitle+' '+x.apTopic).toLowerCase().includes(q)));if(!visible.length)continue;
 const block=document.createElement('div');block.className='week';block.innerHTML=`<div class="week-head"><b>Week ${w}</b><span class="muted">${esc(arr[0]?.phase||'')}</span></div><div class="sessions"></div>`;const ss=block.querySelector('.sessions');
 arr.forEach(x=>{const hidden=!visible.includes(x);const d=done.has(x.id);const div=document.createElement('div');div.className='session '+(d?'done':'');if(hidden)div.style.opacity='.25';div.innerHTML=`<div class="meta">${esc(x.sessionInWeek)} • ${esc(x.apTopic)}</div><a href="lesson.html?id=${encodeURIComponent(x.id)}">${esc(x.title)}</a><p class="muted">${esc(x.subtitle||'')}</p><label><input type="checkbox" ${d?'checked':''} data-id="${x.id}"> completed</label>`;ss.appendChild(div);});wrap.appendChild(block);
 }
 wrap.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.onchange=e=>{const d=getDone();e.target.checked?d.add(e.target.dataset.id):d.delete(e.target.dataset.id);saveDone(d);renderWeeks();});
}
init();