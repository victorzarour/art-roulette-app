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
    const seeMore = document.createElement("p")

    image.className = "work-image"
    workDiv.className = "workDiv"
    workBasics.className = "workBasics"
    workArtist.className = "workInfo"
    workType.className = "workInfo"
    workAcquired.className = "workInfo"
    workCulture.className = "workInfo"
    workPeriod.className = "workInfo"
    workURL.className = "workInfo"
    seeMore.className = "workInfo"

    image.src = work.primaryImageSmall
    workBasics.innerText = `${work.title}, (${work.objectDate})`
    workArtist.innerText = `${work.artistDisplayName} (${work.artistDisplayBio})`
    workType.innerText = `Medium: ${work.medium} / Dimensions: ${work.dimensions}`
    workAcquired.innerText = `Acquired in: ${work.accessionYear}`
    workCulture.innerText = `Culture: ${work.culture}`
    workPeriod.innerText = `Period: ${work.period}`
    workURL.innerText = `Learn more: ${work.objectURL}`
    seeMore.innerText = 'Like what you see? Click on the button below to discover more works by the same artist!'
    
    pageDiv.append(workDiv)
    workDiv.append(image, workBasics, workArtist, workType, workAcquired, workCulture, workPeriod, workURL, seeMore)
}

card.addEventListener("click", e => {
    document.querySelector(".row").style.display = "none"    
})