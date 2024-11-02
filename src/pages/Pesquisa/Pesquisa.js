import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import style from './Pesquisa.module.css'
import {lista_filmes} from '../../services/api.js'

import Avaliacoes from '../../components/Stars/Stars'

import erro from '../../assets/defaultImg.png'

function Pesquisa(){
    const query = new URLSearchParams(useLocation().search);
    const filme = query.get('filme')
    const [pesquisa, setPesquisa] = useState([])
    const [loading, setLoadiing] = useState(true)

    //realizacao de uma request para fazer a pesquisa na api

    useEffect(()=>{
        async function get_filmes(){
            try{
                setPesquisa(await lista_filmes(filme))
            }catch{
                console.log("erro")
            }finally{
                setLoadiing(false)
            }
        }
        get_filmes()
    }, [])

    if(loading){
        return(
            <p className="texto">Carregando...</p>
        )
    }

    return(

        <>
            {Array.isArray(pesquisa) && pesquisa.length > 0 ? (
                <>
                    <form className={style.search_form}>
                        <input
                            type="text"
                            placeholder="Pesquisar filmes..."
                            required
                        />
                        <button type="submit">Pesquisar</button>
                    </form>

                    {pesquisa.map((filme_dados, index) => (

                        <div key={index} className={style.alinha}>

                            <div className={style.img_film}>
                                <img src={filme_dados.Poster} alt={filme_dados.Title} />
                            </div>

                            <div className={style.sobrepor}>

                                <h2>{filme_dados.Title}</h2>

                                <ul>
                                    <li>Diretor: {filme_dados.Director}</li>
                                    <li>Atores: {filme_dados.Actors}</li>
                                </ul>

                                <h3>Avaliações:</h3>
                                <Avaliacoes ratings={filme_dados.Ratings} />

                                <ul>
                                    <li>Trama: {filme_dados.Plot}</li>
                                </ul>

                                <form className="infosfilme-form">
                                    <button type="submit">Acessar informações do filme</button>
                                </form>
                                
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className="texto">Nenhum filme encontrado</p>
            )}
        </>

    )
}

export default Pesquisa;