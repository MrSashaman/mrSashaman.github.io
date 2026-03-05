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





const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.3+0.1
})
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

ctx.fillStyle="rgba(255,0,0,0.7)"
ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fill()

p.y-=p.speed

if(p.y<0){
p.y=canvas.height
p.x=Math.random()*canvas.width
}

})

requestAnimationFrame(draw)
}

draw()