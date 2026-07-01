
const username = "mrSashaman";

const repoContainer = document.getElementById("repo-container");
const loadMoreButton = document.getElementById("loadMore");
const repoCounter = document.getElementById("repoCount");

let repositories = [];
let visibleRepos = 6;


async function loadRepositories() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        if (!response.ok)
            throw new Error("GitHub API Error");

        repositories = await response.json();

        repositories = repositories
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        repoCounter.textContent = repositories.length + "+";

        renderRepositories();

    }

    catch (error) {

        repoContainer.innerHTML = `

        <div class="card">

            <h3>Unable to load repositories</h3>

            <p>

                Check your internet connection or GitHub API.

            </p>

        </div>

        `;

        console.error(error);

    }

}


function renderRepositories() {

    repoContainer.innerHTML = "";

    repositories
        .slice(0, visibleRepos)
        .forEach(repo => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h3>${repo.name}</h3>

                <p>
                    ${repo.description || ""}
                </p>

                <div class="repo-tags">
                    ${getRepoTags(repo)}
                </div>


            `;

            repoContainer.appendChild(card);

        });

    if (visibleRepos >= repositories.length)
        loadMoreButton.style.display = "none";
    else
        loadMoreButton.style.display = "inline-flex";

}


const technologies = [
    "Python",
    "JavaScript",
    "C#",
    "LabAPI",
    "Exiled"
];


function getRepoTags(repo) {

    const tags = [];

    if (repo.language) {
        tags.push(repo.language);
    }

    const text = `${repo.name} ${repo.description || ""}`.toLowerCase();

    if (text.includes("labapi"))
        tags.push("LabAPI");

    if (text.includes("exiled"))
        tags.push("Exiled");

    return [...new Set(tags)]
        .map(tag => `<span class="repo-tag">${tag}</span>`)
        .join("");

}

function getTechBadges(repo) {

    const text = `${repo.name} ${repo.description || ""}`.toLowerCase();

    return technologies
        .filter(tech => text.includes(tech.toLowerCase()))
        .map(tech => `<span class="repo-tag">${tech}</span>`)
        .join("");

}

6

loadMoreButton.addEventListener("click", () => {

    visibleRepos += 6;

    renderRepositories();

});



loadRepositories();



const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

class Particle {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 2 + 1;

        this.speed = Math.random() * .4 + .2;

        this.alpha = Math.random() * .6 + .2;

    }

    update() {

        this.y -= this.speed;

        if (this.y < -10) {

            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(124,92,255,${this.alpha})`;

        ctx.fill();

    }

}

for (let i = 0; i < 120; i++) {

    particles.push(new Particle());

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();



const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;

            entry.target.style.transform =
                "translateY(0)";

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll(
    ".card, .tool, .stat-card, .about-card, .contact-card"
).forEach(element => {

    element.style.opacity = 0;

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        ".6s ease";

    observer.observe(element);

});



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (scrollY >= top)
            current = section.id;

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current)
            link.classList.add("active");

    });

});



const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30)
        header.classList.add("scrolled");
    else
        header.classList.remove("scrolled");

});