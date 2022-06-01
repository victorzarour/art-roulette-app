const card = document.querySelector(".card")
const pageDiv = document.querySelector(".container")

document.addEventListener("DOMContentLoaded", e =>{
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting")
    .then (res => res.json())
    .then (work => highlightIteration(work.objectIDs))
})

function highlightIteration(highlights){
    let randomNumber = Math.floor(Math.random() * highlights.length);
    let randomWork = highlights[randomNumber]  

    card.addEventListener("click", e =>{
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomWork}`)
        .then (res => res.json())
        .then (work => lengthImage(work))
    })
}

function lengthImage(work){
    if (work.primaryImage.length >= 10) {
        artWork(work)
    }
    else {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting")
    .then (res => res.json())
    .then (work => highlightIteration(work.objectIDs))
    
    
    function highlightIteration(highlights){
        let randomNumber = Math.floor(Math.random() * highlights.length);
        let randomWork = highlights[randomNumber]  
                
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomWork}`)
        .then (res => res.json())
        .then (work => lengthImage(work))
        }
    }
  }
  

function artWork(work){

    document.querySelector("li a").style.display = "inline-block"

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
    seeMore.innerText = "Like what you see? Click on the search button on the Home page and search for the artist's name to discover their work!"
    
    pageDiv.append(workDiv)
    workDiv.append(image, workBasics, workArtist, workType, workAcquired, workCulture, workPeriod, workURL, seeMore)
}

card.addEventListener("click", e => {
    document.querySelector(".row").style.display = "none"    
})

const searchButton = document.querySelector(".buttontwo")
const container = document.querySelector(".container")

searchButton.addEventListener("click", e => {
    document.querySelector(".row").style.display = "none"  
    document.querySelector("li a").style.display = "inline-block"  
})

searchButton.addEventListener("click", e => {
    const searchDiv = document.createElement("div")
    const searchMessage = document.createElement("p")
    const searchForm = document.createElement("form")
    const searchInput = document.createElement("input")
    const submitButton = document.createElement("input")

    searchMessage.innerText = "If you already have something in mind and would like to search the MET Collection for it, you can also do so in the search bar below!"

    searchDiv.className = "searchDiv"
    searchInput.setAttribute("type", "text")
    searchInput.setAttribute("placeholder", "Search...")
    searchInput.setAttribute("name", "search")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("value", "Submit")

    pageDiv.append(searchDiv)
    searchDiv.append(searchMessage, searchForm)
    searchForm.append(searchInput, submitButton)

    searchForm.addEventListener("submit", e =>{
        e.preventDefault() 
        const searchValue = searchForm.search.value
    
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchValue}`)
          .then (res => res.json())
          .then (work => titleSearch(work.objectIDs))
      })
      
      function titleSearch(searchlist){
        const searchlistSpliced = searchlist.splice(0,10)
        searchlistSpliced.forEach(searchquery => {
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchquery}`)
          .then (res => res.json())
          .then (object => turnURLIntoArray(object.objectURL)) 
        }) 
      }

      function turnURLIntoArray(URLs){
          const urlArray = []
          urlArray.push(URLs)
          appendWorks(urlArray)
      }

      function appendWorks(urlList){
        urlList.forEach(url => {
            const urlParagraph = document.createElement("p")
            urlParagraph.innerText = url


            searchDiv.append(urlParagraph)
        })
      }
})