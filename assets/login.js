const archives = {
  marketdisruption: {
    passwordHash: "f7e9daa87cd790dd3529cf73792b36adf9e43cc786502a5e72278b865c001dd0",
    path: "archives/01/"
  },
  passingasshole: {
    passwordHash: "209d28caac2071caaa2ba4de33d5c11fcf97a721dc0ef2e420d588e641963bf1",
    path: "archives/02/"
  }
};

const master = {
  username: "AssholeAdministrator180726",
  passwordHash: "5e5c4d7370c93efc724f6b46f026f06c2e0e0566bdfc0b7474184cdf46fe2e79",
  path: "archives/"
};

const form = document.getElementById("loginForm");
const error = document.getElementById("error");

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(hash)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  error.hidden = true;

  try {
    const enteredHash = await sha256(password);

    /*
     * DAILY ARCHIVE ACCESS
     */
    const archive = archives[username];

    if (archive && enteredHash === archive.passwordHash) {
      window.location.href = archive.path;
      return;
    }

    /*
     * MASTER ADMINISTRATOR ACCESS
     */
    if (
      username === master.username &&
      enteredHash === master.passwordHash
    ) {
      window.location.href = master.path;
      return;
    }

    error.hidden = false;

  } catch (err) {
    console.error("Archive error:", err);
    error.textContent =
      "Archive access encountered an administrative disagreement.";
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
