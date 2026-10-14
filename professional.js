/* Small, isolated presentation enhancements. Existing market feed/chart logic stays untouched. */
(()=>{'use strict';
const symbols=['btc','eth','inj','sol'];
const validText=s=>s&&s.trim()&&!/^(—|–|-|loading|caricamento|in attesa|undefined|null)$/i.test(s.trim());
const clock=document.getElementById('proClock');
function refreshClock(){const now=new Date();if(clock){clock.textContent=now.toLocaleTimeString('it-IT');document.getElementById('proDate').textContent=now.toLocaleDateString('it-IT',{weekday:'short',day:'numeric',month:'short'});}}
function refreshOverview(){let available=0;
 for(const symbol of symbols){const source=document.getElementById(symbol+'-price'),change=document.getElementById(symbol+'-change'),destination=document.getElementById('pro-'+symbol+'-price'),delta=document.getElementById('pro-'+symbol+'-change');if(!destination||!source)continue;
 const price=source.textContent.trim(),variation=change?.textContent.trim()||'';
 if(validText(price)){available++;if(destination.textContent!==price)destination.textContent=price;}
 if(validText(variation)){if(delta.textContent!==variation)delta.textContent=variation;delta.classList.toggle('positive',/\+|positive|up/i.test(variation)&&!variation.includes('-'));delta.classList.toggle('negative',/-|−|negative|down/i.test(variation));}}
 const status=document.getElementById('proDataLabel'),at=document.getElementById('proUpdatedAt');
 if(available){status.textContent=available===4?'Mercati principali disponibili':'Feed parzialmente disponibili: '+available+' su 4 mercati principali';at.textContent='Verifica '+new Date().toLocaleTimeString('it-IT');}
 else{status.textContent='In attesa dei dati: i valori non disponibili non vengono stimati.';at.textContent='—';}
}
document.getElementById('proToTop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
document.querySelectorAll('.pro-quicknav a').forEach(a=>a.addEventListener('click',()=>{const id=a.getAttribute('href').slice(1),target=document.getElementById(id);if(!target)return;setTimeout(()=>{target.scrollIntoView({block:'start',behavior:'smooth'});window.dispatchEvent(new Event('resize'));},60);}));
refreshClock();refreshOverview();setInterval(()=>{if(document.hidden)return;refreshClock();refreshOverview();},2000);
})();
