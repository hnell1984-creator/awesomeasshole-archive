const archive = {
  username: "marketdisruption",
  passwordHash: "f7e9daa87cd790dd3529cf73792b36adf9e43cc786502a5e72278b865c001dd0",
  title: "THE ADVERTISING PITCH",
  kicker: "BEFORE WE EVER MET",
  body: `<p>It started with a picture.</p>
<p>I don't remember knowing anything about you yet. I just remember being drawn to you.</p>
<p>The photograph. Clear. Monochrome. Your eyes were bright and seemed to look straight through me, but there was something playful behind them.</p>
<p>Then there was your voicenote.</p>
<p>I remember listening to it and trying to work out how on earth your name was spelled.</p>
<p><strong>Döhne.</strong></p>
<p>A photograph, a voice, and a name I couldn't quite figure out.</p>
<p>Apparently, that was enough to get my attention.</p>
<p>So, being brave and all, I liked the picture.</p>
<div class="evidence">
  <div class="evidence-label">BEWYSSTUK A1</div>
  <img class="evidence-image" src="assets/the-picture.jpg" alt="The photograph that started the conversation.">
  <div class="evidence-text">The photograph that started the conversation.</div>
  <div class="status"><strong>STATUS:</strong> Evidence of an apparently consequential like.</div>
</div>
<p>I said hello; you replied.</p>
<p>Very quickly, my profile was turned into an ad.</p>
<p>You were intrigued by the <em>ad to my life</em> and wanted to know who my target audience was.</p>
<p>Funny thing is, I didn't know you worked in marketing...yet (Dis soos CrossFit, hoe weet jy?).</p>
<p>I also knew very little about advertising, just a handful of phrases floating around somewhere in my brain.</p>
<p>Target audience, demographics, market share — I decided that was enough to build an entire campaign.</p>
<p>Toe werk ek met wat ek het.</p>
<p>The week had been as kind as a vegetarian fox in a henhouse.</p>
<p>The campaign was looking for someone kind, curious, emotionally mature, and who laughed at terrible jokes.</p>
<p>Demographics were flexible.</p>
<p>You laughed and said we might be competing for the same market share.</p>
<p>I figured maybe we weren't competing at all, simply testing brand compatibility.</p>
<p>Ever the overachiever, you took it one step further: brand collaboration.</p>
<p>Two strangers on Hinge had managed to create an advertising campaign for a relationship neither of them knew they were applying for.</p>
<p>The application kept progressing.</p>

<div class="evidence">
  <div class="evidence-label">BEWYSSTUK B1</div>
  <img class="evidence-image" src="assets/the-advertisement.jpg" alt="The photograph from my side of the campaign.">
  <div class="evidence-text">The photograph from my side of the campaign.</div>
  <div class="status"><strong>STATUS:</strong> Evidence suggests graves, powerful outfits, and flower hats may have influenced the decision-making...Wie weet hierdie dinge?</div>
</div>

<p>Randomly (as things tend to happen in our world), we discovered we both loved <strong>Patch Adams</strong>.</p>
<p>You'd watched it a hundred times; it still made you cry.</p>
<p>Important discovery: Same favourite part — <strong>the gynaecology congress.</strong></p>
<p><strong>Turns out we were both rather gynaecologically inclined.</strong><br>
You, a baby lesbian.<br>
Me, a lifetime gay.</p>
<p>The campaign was looking very promising.</p>

<p>Conversations moved beyond advertising and into the slightly more useful business of finding out who the other person actually was.</p>
<p>Work. Weekends. Friends. Family.</p>
<p>And then padel.</p>
<p>You suggested we should go play.</p>
<p>It turned out to be significantly more complicated than simply deciding to play.</p>
<p>Singles or doubles? Padel or pickleball? Different courts, different venues — there were a surprising number of variables involved in getting two randos onto a court.</p>
<p>A full menu of possibilities (enter first glimpse of LD) was presented.</p>
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

  try {
    const enteredHash = await sha256(password);

    if (
      username === archive.username &&
      enteredHash === archive.passwordHash
    ) {
      document.getElementById("memoryTitle").textContent = archive.title;
      document.getElementById("memoryBody").innerHTML = archive.body;

      loginView.hidden = true;
      archiveView.hidden = false;
      error.hidden = true;
    } else {
      error.hidden = false;
    }
  } catch (err) {
    console.error("Archive error:", err);
    error.textContent = "Archive access encountered an administrative disagreement.";
    error.hidden = false;
  }
});


document.getElementById("showPassword").addEventListener("click", function (e) {
  e.preventDefault();

  const input = document.getElementById("password");

  if (input.type === "password") {
    input.type = "text";
    this.textContent = "◌";
    this.setAttribute("aria-label", "Hide password");
  } else {
    input.type = "password";
    this.textContent = "◉";
    this.setAttribute("aria-label", "Show password");
  }
});


document.getElementById("logout").addEventListener("click", () => {
  archiveView.hidden = true;
  loginView.hidden = false;
  form.reset();
  error.hidden = true;

  document.getElementById("password").type = "password";
  document.getElementById("showPassword").textContent = "◉";
});
