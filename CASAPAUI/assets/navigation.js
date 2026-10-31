/* Native links and dialog focus; motion never delays destination navigation. */
(() => {
 'use strict';
 const trigger=document.querySelector('[data-nav-open]');
 const menu=document.getElementById(trigger?.getAttribute('aria-controls'));
 if(!trigger||!menu)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let closing=null;
 function finish(){closing?.cancel();closing=null;if(menu.open)menu.close();}
 function close(){
  if(!menu.open||closing)return;
  if(reduce.matches){finish();return;}
  closing=menu.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-24px)'}],{duration:210,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
  closing.finished.then(finish,()=>{});
 }
 trigger.disabled=false;
 trigger.addEventListener('click',()=>{
  if(menu.open)return;
  document.body.classList.add('nav-is-open');
  trigger.setAttribute('aria-expanded','true');
  menu.querySelectorAll('img').forEach(image=>{image.loading='eager';});
  menu.showModal();
 });
 menu.querySelector('[data-nav-close]').addEventListener('click',close);
 menu.addEventListener('cancel',event=>{event.preventDefault();close();});
 menu.addEventListener('close',()=>{
  closing?.cancel();closing=null;
  document.body.classList.remove('nav-is-open');
  trigger.setAttribute('aria-expanded','false');
 });
 menu.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const url=new URL(link.href);
  const target=url.origin===location.origin&&url.pathname===location.pathname&&url.hash?document.getElementById(decodeURIComponent(url.hash.slice(1))):null;
  finish();
  if(target){target.tabIndex=-1;requestAnimationFrame(()=>target.focus({preventScroll:true}));}
 }));
 reduce.addEventListener('change',()=>{if(reduce.matches&&closing)finish();});
})();
