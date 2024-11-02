import style from './Home.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){

    const [filme, setFilme] = useState('')
    const navigate = useNavigate();

    function pesquisa(e){
        e.preventDefault()

        navigate(`/pesquisa?filme=${filme}`)
    }

    return(
        <>
            <main>
                <div className={style.pesquisa}>
                    <h3>Movienews: Descubra tudo sobre seus filmes favoritos</h3> 
                    <form className={style.search_form_home} onSubmit={pesquisa}>
                        <input
                            type="text"
                            placeholder="Pesquisar filmes..."
                            value = {filme}
                            onChange= {(e) => {setFilme(e.target.value)}}
                            required
                        />
                        <button type="submit">Pesquisar</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Home;