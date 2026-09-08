/*
  Awesome Asshole — static archive
  Passwords are stored only as SHA-256 hashes. The archive is intentionally
  static so it can run on GitHub Pages without paid web hosting.
*/
const entries = [
  {
    username: 'brandcompatibility',
    passwordHash: 'b34ec79c6bf23ff0c3550296444433037c8359b2ec9b2cd768eb3ab46744940e',
    title: 'The Advertising Pitch',
    date: 'Archive 01',
    html: `<p class="small">Before we ever met</p><p>It started with an advertisement.</p><p class="quote">“I'm intrigued by the ad to your life…”</p><p>And somehow, somewhere between demographics, market share and terrible jokes, we started testing something much more interesting than brand compatibility.</p><p>This is where the story begins.</p>`
  }
];

async function sha256(text){
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

const loginView=document.getElementById('loginView');
const archiveView=document.getElementById('archiveView');
const form=document.getElementById('loginForm');
const error=document.getElementById('error');
form.addEventListener('submit',async e=>{
  e.preventDefault(); error.hidden=true;
  const u=document.getElementById('username').value.trim().toLowerCase();
  const p=document.getElementById('password').value;
  const entry=entries.find(x=>x.username===u);
  if(!entry || await sha256(p)!==entry.passwordHash){error.hidden=false;return}
  document.getElementById('memoryTitle').textContent=entry.title;
  document.getElementById('memoryDate').textContent=entry.date;
  document.getElementById('memoryBody').innerHTML=entry.html;
  loginView.hidden=true; archiveView.hidden=false;
  document.getElementById('password').value='';
});
document.getElementById('logout').addEventListener('click',()=>{archiveView.hidden=true;loginView.hidden=false;document.getElementById('username').value='';document.getElementById('password').value='';});
