const card = document.querySelector(".card")
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

document.addEventListener("DOMContentLoaded", e =>{
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting")
    .then (res => res.json())
    .then (work => highlightIteration(work.objectIDs))
})

function highlightIteration(highlights){
    let randomNumber = Math.floor(Math.random() * highlights.length);
    let randomWork = highlights[randomNumber]  
    console.log(randomWork)

    card.addEventListener("click", e =>{
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomWork}`)
        .then (res => res.json())
        .then (work => artWork(work))
    })
}

function artWork(work){

    document.querySelector("li a").style.display = "inline-block"

    const pageDiv = document.querySelector(".container")

    const workDiv = document.createElement("div")
    const image = document.createElement("img")
    const workBasics = document.createElement ("h2")
    const workArtist = document.createElement ("h3")
    const workType = document.createElement ("h4")
   
    const workAcquired = document.createElement("p") 
    const workCulture = document.createElement("p")
    const workPeriod = document.createElement("p")
    const workURL = document.createElement("p")

    image.className = "work-image"
    workDiv.className = "workDiv"
    workBasics.className = "workBasics"
    workArtist.className = "workInfo"
    workType.className = "workInfo"
    workAcquired.className = "workInfo"
    workCulture.className = "workInfo"
    workPeriod.className = "workInfo"
    workURL.className = "workInfo"

    image.src = work.primaryImageSmall
    workBasics.innerText = `${work.title}, (${work.objectDate})`
    workArtist.innerText = `${work.artistDisplayName} (${work.artistDisplayBio})`
    workType.innerText = `Medium: ${work.medium} / Dimensions: ${work.dimensions}`
    workAcquired.innerText = `Acquired in: ${work.accessionYear}`
    workCulture.innerText = `Culture: ${work.culture}`
    workPeriod.innerText = `Period: ${work.period}`
    workURL.innerText = `Learn more: ${work.objectURL}`
    
    pageDiv.append(workDiv)
    workDiv.append(image, workBasics, workArtist, workType, workAcquired, workCulture, workPeriod, workURL)
}

card.addEventListener("click", e => {
    document.querySelector(".row").style.display = "none"    
})

// Lori added the lines 69 - 72
const btnSub = document.querySelector('button#btn-subscribe');
btnSub.addEventListener("click", function(btnSub){
    alert("If you need more beautiful, historical works in your life, please consider subscribing for more.  Thank you!"); 
});