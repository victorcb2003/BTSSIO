// MOVIE DB API 


// Vous aller coder une app permettant de rechercher, filtrer et liker les films/series
// L'API est la suivante : https://www.omdbapi.com/



// 1 - Vous allez d'abord vérifier le bon fonctionnement de l'API (vous aurez besoin d'une clé API)
// 2 - Vous coderez ensuite les éléments HTML du front (input de recherche, boutons de filtres etc)
// 3 - Vous reliez ensuite le HTML au JS 
// 4 - Dans la requete API il faudra afficher les bons films selon la recherche
// 5 - Ensuite il faudra faire fonctionner les boutons de filtres (ex: le genre de films/séries)
// 6 - 
// Enfin il faudra sauvegarder en LS les favoris et avoir accès à une partie favoris 
// 7 - On doit pouvoir supprimer les éléments des favoris (et donc aussi en LS)   

const API = "eed08b06&"
const url = "https://www.omdbapi.com/?apikey="

let search = document.querySelector(".search")
let searchbtn = document.querySelector(".searchBtn")
let favBtn = document.querySelector(".favBtn")
let resultats = document.querySelector(".resultats")
let Film = document.querySelector("#Films")
let Series = document.querySelector('#Séries')
let Year = document.querySelector("#année")

function req(filtre = "") {
    fetch(url + API + filtre)
        .then(res => res.json())
        .then(data => {
            resultats.innerHTML = ""
            data.Search.forEach(element => {
                div = document.createElement("div")
                img = document.createElement("img")
                img.addEventListener("click", () => {
                    fetch(url + API + `&t=${element.Title}`)
                        .then(res => res.json())
                        .then(Data => {
                            resultats.innerHTML = ""
                            let clef = Object.keys(Data)
                            div = document.createElement("div")
                            img = document.createElement("img")
                            titre = document.createElement("h2")
                            img.src = element.Poster
                            titre.textContent = element.Title
                            année.textContent = element.Year
                            div.append(img, titre)
                            clef.forEach((ele) => {
                                if (Data[ele] != "N/A" && typeof (Data[ele]) == "string" && ele != "Poster" && ele != "Title" && ele!= "Response") {
                                    let h2 = document.createElement("h2")
                                    h2.textContent = `${ele} : ${Data[ele]}`
                                    div.appendChild(h2)
                                }
                            })
                            resultats.appendChild(div)

                        })
                })
                favori = document.createElement("button")
                titre = document.createElement("h2")
                année = document.createElement("h2")
                favori.addEventListener("click", () => {
                    let mem = []
                    mem = mem.concat(JSON.parse(localStorage.getItem("favorie")))
                    mem = mem.filter((ele) => ele != null)
                    if (mem.filter((ele) => ele[0] == element.Poster && ele[1] == element.Title).length == 0) {
                        mem.push([element.Poster, element.Title, element.Year])
                        localStorage.setItem("favorie", JSON.stringify(mem))
                    }
                })
                favori.textContent = "Ajouter au favories"
                img.src = element.Poster
                titre.textContent = element.Title
                année.textContent = element.Year
                div.append(img, titre, année, favori)
                resultats.appendChild(div)
            })
        })
}

function favorie() {
    let mem = []
    resultats.innerHTML = ""
    mem = mem.concat(JSON.parse(localStorage.getItem("favorie")))
    mem.forEach((element) => {
        div = document.createElement("div")
        img = document.createElement("img")
        img.addEventListener("click", () => {
            fetch(url + API + `&t=${element[1]}`)
                .then(res => res.json())
                .then(Data => {
                    resultats.innerHTML = ""
                    let clef = Object.keys(Data)
                    div = document.createElement("div")
                    img = document.createElement("img")
                    titre = document.createElement("h2")
                    img.src = element[0]
                    titre.textContent = element[1]
                    div.append(img, titre)
                    clef.forEach((ele) => {
                        if (Data[ele] != "N/A" && typeof (Data[ele]) == "string" && ele != "Poster" && ele != "Title") {
                            let h2 = document.createElement("h2")
                            h2.textContent = `${ele} : ${Data[ele]}`
                            div.appendChild(h2)
                        }
                    })
                    resultats.appendChild(div)

                })
        })
        favori = document.createElement("button")
        titre = document.createElement("h2")
        année = document.createElement("h2")
        favori.addEventListener("click", () => {
            let mem = []
            mem = mem.concat(JSON.parse(localStorage.getItem("favorie")))
            mem.forEach((ele)=>{console.log(ele == element,ele,element)})
            mem = mem.filter((ele) => ele != null && ele[0] != element[0] && ele[1] != element[1])
            localStorage.setItem("favorie", JSON.stringify(mem))
            favorie()
        })
        favori.textContent = "Supprimer des favories"
        img.src = element[0]
        titre.textContent = element[1]
        année.textContent = element[2]
        div.append(img, titre, année, favori)
        resultats.appendChild(div)
    })
}


favBtn.addEventListener("click", () => {
    favorie()
})

searchbtn.addEventListener("click", () => {
    let request = `&s=${search.value}`
    if (Film.checked && !Series.checked) {
        request += "&type=movie"
    } else if (!Film.checked && Series.checked) {
        request += "&type=series"
    }
    if (Year.value != "") {
        request += `&y=${Year.value}`
    }
    req(request)

})
