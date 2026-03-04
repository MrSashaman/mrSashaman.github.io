const username = "MrSashaman"

let repos = []
let visible = 14

const container = document.getElementById("repo-container")
const loadMoreBtn = document.getElementById("loadMore")

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
.then(res => res.json())
.then(data => {

repos = data.filter(repo => !repo.fork)

renderRepos()

})

function renderRepos(){

container.innerHTML = ""

repos.slice(0, visible).forEach(repo => {

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description ?? "No description"}</p>
<a href="${repo.html_url}" target="_blank">Open Repo</a>
`

container.appendChild(card)

})

}

loadMoreBtn.addEventListener("click", () => {

visible += 7

renderRepos()

})

/* THEME SWITCH */

const toggle = document.getElementById("themeToggle")

if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light")
toggle.textContent = "🌙"
}

toggle.addEventListener("click", () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light")
toggle.textContent = "🌙"
}else{
localStorage.setItem("theme","dark")
toggle.textContent = "☀️"
}

})