import axios from 'axios'

const url_api = "http://www.omdbapi.com/?apikey=e982fb10&"

export async function lista_filmes(nome){
    if(nome){
        try{
            const response = await axios.get(url_api + `s=${nome}`)

            const filmes = response.data.Search
           
           const filmes_info = await Promise.all(filmes.map((filme) => {
                return dados_filme(filme.imdbID)
           }))

           return filmes_info
            
        }catch{
            console.log("houve um erro")
        }
    }
}


export async function dados_filme(id){
    const response = await axios.get(url_api + `i=${id}`)
    return response.data
}