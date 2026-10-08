#!/usr/bin/env node
'use strict';
/* Every lesson is rendered and every reveal step is inspected before publishing.
   No third-party packages required. This supplements, not replaces, a teacher review. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'lesson.js'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const errors=[],warnings=[];
const names=n=>(n.attrs.class||'').split(/\s+/).filter(Boolean);
const has=(n,cl)=>names(n).includes(cl);
function parse(html){
 const root={tag:'root',attrs:{},children:[]},stack=[root];
 const voids=new Set(['br','hr','img','input','meta','link','source']);
 for(const token of html.match(/<[^>]*>|[^<]+/g)||[]){
  if(/^<\//.test(token)){
   const tag=(/^<\/([\w-]+)/.exec(token)||[])[1];
   if(!tag)continue;
   while(stack.length>1 && stack[stack.length-1].tag!==tag)stack.pop();
   if(stack.length>1)stack.pop();
  }else if(token.startsWith('<')){
   const m=/^<([\w-]+)/.exec(token);if(!m)continue;
   const tag=m[1].toLowerCase(),attrs={};
   for(const a of token.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))
    attrs[a[1]]=a[2]===undefined?a[3]:a[2];
   const n={tag,attrs,children:[]};
   stack[stack.length-1].children.push(n);
   if(!voids.has(tag)&&!token.endsWith('/>'))stack.push(n);
  }else stack[stack.length-1].children.push({tag:'#text',text:token,attrs:{},children:[]});
 }
 return root;
}
function find(root,pred){
 const out=[];
 const walk=n=>{if(pred(n))out.push(n);for(const c of n.children||[])walk(c);};
 walk(root);return out;
}
const normalize=s=>s.replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g,' ').replace(/\s+/g,' ').trim();
function visible(node,revealed){
 if(node.tag==='#text')return node.text;
 if(has(node,'teacher'))return '';
 if(has(node,'beat')&&!revealed.has(node))return '';
 return (node.children||[]).map(n=>visible(n,revealed)).join(' ');
}
function allText(n){return n.tag==='#text'?n.text:(n.children||[]).map(allText).join(' ');}

if(!/\.slide\s+\.beat:not\(\.revealed\)\s*\{\s*display:\s*none\s*!important/i.test(css))
 errors.push('Missing global CSS safeguard against early reveal visibility');
if(!/\.slide\s+\.beat\.revealed\.variable-profile/.test(css))
 errors.push('Missing shown-grid CSS safeguard for variable profile');

const context={window:{COURSE_DATA:{lessons:[],optional:[]}},URLSearchParams,
 location:{search:'?id=f1'},document:{querySelector:()=>({})},
 localStorage:{getItem:()=>null,setItem:()=>{}},console};
vm.createContext(context);
const dataFiles=['data.js'].concat(fs.readdirSync(root).filter(n=>/^data-\d+\.js$/.test(n))
 .sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0])));
for(const name of dataFiles)
 vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),context,{filename:name});
const stop=src.indexOf('\nif(!L){');
if(stop<0)throw Error('Missing lesson generator boundary');
vm.runInContext(src.slice(0,stop),context,{filename:'lesson.js'});
const special={
 f1:'buildWhatIsComputer',f2:'buildFilesEnvironment',f3:'buildSourceExecution',
 'p-foundation-1':'buildFoundationPractice1',f4:'buildPythonOnRamp',
 f5:'buildInputDebugging',f6:'buildPythonChallenge',
 'p-foundation-2':'buildFoundationPractice2',
 'u1-1':'buildTopic11','u1-2':'buildTopic12','u1-3':'buildTopic13',
 'p-1-1-1-3':'buildWeek3Practice'
};
let nLessons=0,nScenes=0,nClicks=0;
for(const l of context.window.COURSE_DATA.lessons.concat(context.window.COURSE_DATA.optional)){
 const fn=special[l.id]||(l.kind==='practice'?'buildPractice':'buildLesson');
 if(typeof context[fn]!=='function'){errors.push(l.id+': missing '+fn);continue;}
 const html=context[fn](l);
 const slides=find(parse(html),n=>n.tag==='section'&&has(n,'slide'));
 if(!slides.length)errors.push(l.id+': no rendered slide');
 nLessons++;
 for(const [index,slide] of slides.entries()){
  nScenes++;
  const mark=l.id+' scene '+(index+1);
  const beats=find(slide,n=>has(n,'beat'));
  // Each named variable should have one stable memory representation per scene.
  const memories=find(slide,n=>has(n,'memory-board'));
  const seenNames=new Set();
  for(const board of memories){
   const labels=find(board,n=>has(n,'name'));
   const name=labels.length?normalize(allText(labels[0])):'';
   if(name && seenNames.has(name))errors.push(mark+': repeated memory boxes for '+name+'; update the same visual state');
   if(name)seenNames.add(name);
  }
  const initial=normalize(visible(slide,new Set()));
  const used=new Set();
  for(const b of beats){
   if(used.has(b))continue;
   const group=b.attrs['data-reveal-group'];
   const step=group?beats.filter(n=>!used.has(n)&&n.attrs['data-reveal-group']===group):[b];
   const before=normalize(visible(slide,used));
   for(const n of step)used.add(n);
   const after=normalize(visible(slide,used));
   nClicks++;
   if(before===after&&!step.some(n=>has(n,'branch-answer')||has(n,'value-update-trigger')))
    errors.push(mark+': reveal has no visible semantic change');
   for(const n of step){
    const t=normalize(allText(n));
    if(t.length>55 && before.includes(t))
     warnings.push(mark+': reveal repeats existing text');
   }
  }
  if(l.id==='u1-2' && find(slide,n=>n.tag==='h2'&&normalize(allText(n))==='What is a variable?').length){
   const diag=find(slide,n=>has(n,'topic12-variable-card'));
   const dup=find(slide,n=>has(n,'variable-profile')||has(n,'memory-board'));
   if(diag.length!==1||dup.length)errors.push(mark+': duplicate variable tables');
   if(beats.length!==2||beats.some(n=>n.attrs['data-reveal-group']!=='variable-model'))
    errors.push(mark+': variable model must be revealed in one teacher click');
   if(/\bdata type\b|\bint\b/i.test(initial))
    errors.push(mark+': variable type leaked before reveal');
  }
  const title=normalize(allText(find(slide,n=>n.tag==='h2')[0]||{children:[]}));
  if(/^(Practice|Challenge|Error detective)/i.test(title)){
   function checkAnswers(node,hidden){
    const concealed=hidden||has(node,'beat');
    if((has(node,'practice-answer-grid')||has(node,'answer-tag'))&&!concealed)
     warnings.push(mark+': answer panel not hidden behind a reveal');
    for(const child of node.children||[])checkAnswers(child,concealed);
   }
   checkAnswers(slide,false);
  }
 }
}
// Reference-alignment gate: every textbook subsection needs a traceable scene.
const coveragePath=path.join(root,'curriculum-coverage.json');
if(fs.existsSync(coveragePath)){
 const maps=JSON.parse(fs.readFileSync(coveragePath,'utf8'));
 for(const [lessonId,map] of Object.entries(maps)){
  const lesson=context.window.COURSE_DATA.lessons.find(l=>l.id===lessonId);
  if(!lesson){errors.push('coverage: missing lesson '+lessonId);continue;}
  if(!lesson.resources?.some(r=>r.url===map.referenceSource))
   errors.push('coverage: '+lessonId+' is missing exact matching textbook resource');
  const fn=special[lessonId]||(lesson.kind==='practice'?'buildPractice':'buildLesson');
  const slides=find(parse(context[fn](lesson)),n=>n.tag==='section'&&has(n,'slide'));
  const headings=new Set(slides.flatMap(s=>find(s,n=>n.tag==='h2').map(n=>normalize(allText(n)))));
  let mapped=0;
  for(const area of map.referenceSections){
   if(!area.scenes?.length)errors.push('coverage: '+lessonId+' / '+area.section+' has no mapped scenes');
   for(const title of area.scenes||[]){
    if(!headings.has(title))errors.push('coverage: '+lessonId+' / '+area.section+' missing scene '+title);
    else mapped++;
   }
  }
  if(!map.deferred?.length)warnings.push('coverage: '+lessonId+' has no documented later-topic deferrals');
  console.log('Reference crosswalk '+lessonId+': '+map.referenceSections.length+' source sections, '+mapped+' mapped scenes, '+(map.deferred?.length||0)+' deferred topics.');
 }
}

console.log('Audited '+nLessons+' lessons, '+nScenes+' slides, '+nClicks+' actual reveal clicks.');
for(const w of warnings.slice(0,50))console.log('REVIEW '+w);
if(warnings.length>50)console.log('REVIEW '+(warnings.length-50)+' additional warnings');
for(const e of errors)console.error('FAIL '+e);
if(errors.length){console.error('FAILED: '+errors.length+' regressions.');process.exitCode=1;}
else console.log('PASS: structural reveal safeguards; '+warnings.length+' pedagogical review suggestions.');
