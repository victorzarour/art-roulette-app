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
    const workType = document.createElement ("p")
    
    const workCulture = document.createElement("p")
    const workPeriod = document.createElement("p")
    const workLearnMore = document.createElement("p")

    image.className = "work-image"
    workDiv.className = "workDiv"
    workBasics.className = "workBasics"
    workArtist.className = "workInfo"
    workType.className = "workInfo"
    workCulture.className = "workInfo"
    workPeriod.className = "workInfo"
    workLearnMore.className = "workInfo"

    image.src = work.primaryImageSmall
    workBasics.innerText = `${work.title}, (${work.objectDate})`
    workArtist.innerText = work.artistDisplayName > 5 ? `${work.artistDisplayName} (${work.artistDisplayBio})` : 'Artist Not Listed' 
    workType.innerText = `Medium: ${work.medium} / Dimensions: ${work.dimensions}`
    workCulture.innerText = work.culture.length > 5 ? `Culture: ${work.culture}` : 'Culture: Not Listed'
    workPeriod.innerText = work.period.length > 5 ? `Period: ${work.period}` : 'Period: Not Listed'
    workLearnMore.innerHTML = `Learn more about this work <a href=${work.objectURL}>here<a>`

    pageDiv.append(workDiv)
    workDiv.append(image, workBasics, workArtist, workType, workCulture, workPeriod, workLearnMore)
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

    searchMessage.innerText = "If you have an artist, work, or theme in mind and would like to search the MET Collection for it, you can do so in the search bar below! Your search will return the first ten results."

    searchMessage.id = "searchMessage"
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
          .then (object => turnURLIntoArray(object)) 
        }) 
      }

      function turnURLIntoArray(works){
          const workArray = []
          workArray.push(works)
          appendWorks(workArray)
      }

      function appendWorks(workList){
        workList.forEach(work => {
            const workParagraph = document.createElement("p")
            workParagraph.innerHTML = `<a href=${work.objectURL}>${work.title}, by ${work.artistDisplayName}<a>`

            searchDiv.append(workParagraph)
        })
      }
})

const btnAbout = document.querySelector('#button-1');
btnAbout.addEventListener("click", e => {
    alert(`This project was created by students in the Flatiron Software Engineering Bootcamp. If you like it and would like to spread the beauty in your community, please share this page with your friends!`); 
});