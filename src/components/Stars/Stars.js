import { useState, useEffect } from 'react';
import style from './Stars.module.css';
import star from '../../assets/star.png';
import grayStar from '../../assets/grayStar.png';

function Stars({ ratings }) {
    const [avaliacoes, setAvaliacoes] = useState([
        { source: "Internet Movie Database", nota: 0 },
        { source: "Rotten Tomatoes", nota: 0 },
        { source: "Metacritic", nota: 0 },
    ]);

    useEffect(() => {
        const novasAvaliacoes = [...avaliacoes];
        
        ratings.forEach(avaliacao => {
            const index = novasAvaliacoes.findIndex(a => a.source === avaliacao.Source);
            if (index !== -1) {
                let valor = 0;
                if (avaliacao.Source === "Internet Movie Database") {
                    valor = parseFloat(avaliacao.Value.slice(0, 3)) * 10;
                } else if (avaliacao.Source === "Rotten Tomatoes") {
                    valor = parseFloat(avaliacao.Value.slice(0, 2));
                } else if (avaliacao.Source === "Metacritic") {
                    valor = parseFloat(avaliacao.Value.slice(0, 2));
                }
                novasAvaliacoes[index].nota = valor;
            }
        });

        setAvaliacoes(novasAvaliacoes);
    }, [ratings]);

    const calcularEstrelas = (nota) => {
        return Math.round((nota / 100) * 5);
    };

    const renderizarEstrelas = (nota) => {
        const numeroDeEstrelas = calcularEstrelas(nota);
        return Array.from({ length: 5 }, (_, index) =>
            index < numeroDeEstrelas ? star : grayStar
        );
    };

    return (
        <>
            {avaliacoes.map(({ source, nota }) => (
                <div className={style.sobrepor1} key={source}>
                    <p>{source}: </p>
                    <br />
                    <p>{nota > 0 ? nota : "N/A"}</p>
                    {renderizarEstrelas(nota).map((img, index) => (
                        <img key={index} src={img} alt="Star" />
                    ))}
                </div>
            ))}
        </>
    );
}

export default Stars;
