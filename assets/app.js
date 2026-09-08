/*
  Awesome Asshole — static archive
  Passwords are stored only as SHA-256 hashes. The archive is intentionally
  static so it can run on GitHub Pages without paid web hosting.
*/
const entries = [
  {
    username: 'marketdisruption',
    passwordHash: 'f7e9daa87cd790dd3529cf73792b36adf9e43cc786502a5e72278b865c001dd0',
    title: 'The Advertising Pitch',
    date: 'Archive 01',
    html: `<p class="small">Before we ever met</p>
<div class="evidence">
  <div class="photo-pair">
    <figure class="photo-card">
      <img src="assets/the-picture.jpg" alt="The picture of Döhne that Henda liked">
      <figcaption><strong>The picture</strong>The one I liked.</figcaption>
    </figure>
    <figure class="photo-card">
      <img src="assets/the-advertisement.jpg" alt="Henda dressed for Día de los Muertos">
      <figcaption><strong>The advertisement</strong>The one you decided was worth investigating.</figcaption>
    </figure>
  </div>
</div>
<p>It started with a picture I liked.</p>
<p>Then you noticed my Halloween picture and decided to open negotiations.</p>
<div class="conversation">
  <p class="quote">“I'm intrigued by the ad to your life…”</p>
  <p>Apparently this was no longer just a Hinge conversation. It was a marketing exercise.</p>
  <p>There were questions about the <span class="punchline">target audience</span>.</p>
  <p>There were demographics.</p>
  <p>There was market share.</p>
  <p>And, somehow, there was a vegetarian fox in a hen house.</p>
  <p class="quote">“Look at Hinge accidentally creating a market disruption. Maybe we're competing for market share… maybe we're testing brand compatibility.”</p>
  <p>We hadn't even met yet.</p>
  <p>But somehow, somewhere between terrible jokes and questionable marketing strategy, we were already making each other laugh.</p>
  <p class="punchline">And apparently, the brand was compatible.</p>
</div>`
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
