// TYPING EFFECT
const text = ["Data Scientist", "ML Engineer", "Python Developer"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  if (!deleting && j <= text[i].length) {
    current = text[i].substring(0, j++);
  } else if (deleting && j >= 0) {
    current = text[i].substring(0, j--);
  }

  document.getElementById("typing").innerHTML = current;

  if (j === text[i].length) deleting = true;
  if (j === 0) {
    deleting = false;
    i = (i + 1) % text.length;
  }

  setTimeout(type, 100);
}
type();


// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});
document.querySelectorAll(".hidden").forEach(el => observer.observe(el));


// CURSOR
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});


// GITHUB PROJECTS AUTO FETCH
fetch("https://api.github.com/users/saheranjumm13/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("projects-container");

    data
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach(repo => {

        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
          <img src="https://picsum.photos/400/250?random=${Math.random()}">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>

          <div class="repo-info">
            ⭐ ${repo.stargazers_count}
            🍴 ${repo.forks_count}
            💻 ${repo.language || "Code"}
          </div>

          <div class="repo-buttons">
            <a href="${repo.html_url}" target="_blank">GitHub</a>
          </div>
        `;

        container.appendChild(card);
      });
  });


// CONTACT FORM
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent ✅");
});
