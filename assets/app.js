const archive = {
  username: "marketdisruption",
  passwordHash: "f7e9daa87cd790dd3529cf73792b36adf9e43cc786502a5e72278b865c001dd0",
  title: "THE ADVERTISING PITCH",
  kicker: "BEFORE WE EVER MET",
  body: `<p>It started with a picture.</p>
<p>I don't remember knowing anything about you yet. I just remember being drawn to you.</p>
<p>There was the photograph. Clear. Monochrome. Your eyes were bright and seemed to look straight through me, but there was something playful behind them.</p>
<p>Then there was your voicenote.</p>
<p>I remember listening to it and trying to work out how on earth your name was spelled.</p>
<p><strong>Döhne.</strong></p>
<p>A photograph, a voice, and a name I couldn't quite figure out.</p>
<p>Apparently, that was enough to get my attention.</p>
<p>So I liked the picture.</p>
<div class="evidence"><div class="evidence-label">BEWYSSTUK A1</div><div class="evidence-text">The photograph that started the conversation.</div><div class="status"><strong>STATUS:</strong> Evidence of an apparently consequential like.</div></div>
<p>I said hello.</p>
<p>You replied.</p>
<p>I remember that first exchange because, very quickly, you turned my profile into an ad.</p>
<p>You were intrigued by the <em>ad to my life</em> and wanted to know who my target audience was.</p>
<p>Funny thing is, I didn't know you worked in marketing...yet(Dis soos Crossfit, hoe weet jy?).</p>
<p>I also knew very little about advertising.</p>
<p>I had a handful of phrases floating around somewhere in my head — target audience, demographics, market share — and apparently decided that was enough to build an entire campaign.</p>
<p>Toe werk ek met wat ek het.</p>
<p>The week had been kind as a vegetarian fox in a hen house.</p>
<p>The campaign was looking for someone kind, curious, emotionally mature, and who laughed at terrible jokes.</p>
<p>Demographics were flexible.</p>
<p>You laughed.</p>
<p>You suggested that perhaps we were competing for the same market share.</p>
<p>I suggested that maybe we weren't competing at all.</p>
<p>Maybe we were testing <strong>brand compatibility</strong>.</p>
<p>You took that one step further and suggested the possibility of a <strong>brand collaboration</strong>.</p>
<p>Somewhere in the middle of all this, two strangers on Hinge had managed to create an advertising campaign for a relationship neither of them knew they were applying for.</p>
<p>And somehow, the application kept progressing.</p>
<div class="evidence"><div class="evidence-label">BEWYSSTUK B1</div><div class="evidence-text">The photograph from my side of the campaign.</div><div class="status"><strong>STATUS:</strong> Evidence suggests graves, powerful outfits and flower hats, may have influenced the decision-making...Wie weet hierdie dinge?</div></div>
<p>The conversation eventually moved beyond advertising and into the slightly more useful business of finding out who the other person actually was.</p>
<p>Work. Weekends. Friends. Family.</p>
<p>And then padel.</p>
<p>You suggested we should go play.</p>
<p>That turned out to be significantly more complicated than simply deciding to play.</p>
<p>Singles or doubles? Padel or pickleball? Different courts, different venues — suddenly there were a surprising number of variables involved in getting two randos onto a court.</p>
<p>You presented me with a full menu of possibilities(enter first glimpse of LD).</p>
<p>Various combinations of padel, pickleball and alternative courts, with the final option being the wonderfully sensible suggestion that we could simply <strong>meet each other for lunch somewhere like normal people.</strong></p>
<p>I opted for a combination of option 3 and option 5.</p>
<p>Which, in retrospect, feels about right.</p>
<p>I refuse to be a normal person, but apparently very willing to compromise.</p>
<p>Somewhere in all of this, we also discovered that we were both Pretoria girls.</p>
<p>Naturally, this required supporting documentation:</p>
<p><a class="archive-link" href="https://music.youtube.com/watch?v=pUbS_P-OyRY&amp;si=DNxw8nhfQaUfjsLJ" target="_blank" rel="noopener noreferrer">PRETORIA GIRL — Desmond and the Tutus</a></p>
<p>Eventually, there was a court booked at Groenkloof.</p>
<p>We were going to meet.</p>
<p>And I had absolutely no idea that I was about to meet the person who would become <strong>YOU</strong>.</p>`
};

const loginView = document.getElementById("loginView");
const archiveView = document.getElementById("archiveView");
const form = document.getElementById("loginForm");
const error = document.getElementById("error");

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,"0")).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  if (username === archive.username && await sha256(password) === archive.passwordHash) {
    document.getElementById("memoryTitle").textContent = archive.title;
    document.getElementById("memoryKicker").textContent = archive.kicker;
    document.getElementById("memoryBody").innerHTML = archive.body;
    loginView.hidden = true;
    archiveView.hidden = false;
    error.hidden = true;
  } else {
    error.hidden = false;
  }
});

document.getElementById("showPassword").addEventListener("click", () => {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
});

document.getElementById("logout").addEventListener("click", () => {
  archiveView.hidden = true;
  loginView.hidden = false;
  form.reset();
});
