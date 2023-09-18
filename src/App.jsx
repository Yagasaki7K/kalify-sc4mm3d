import styled from 'styled-components';
import listURLs from './links';
import { useState, useEffect, useCallback } from 'react';

function App() {
    const [getLink, setGetLink] = useState('');
    const [message, setMessage] = useState('Check that your link is not tampered with');
    const [language, setLanguage] = useState('EN-US')

    function hiddenHowToWorks() {
        const elementToRemove = document.getElementById('howWorks');
        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        } else {
            window.location.reload();
        }
    }

    function filterDomains(url) {
        const dominioRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/g;
        const dominioMatch = dominioRegex.exec(url);

        if (dominioMatch && dominioMatch.length > 1) {
            return dominioMatch[1];
        }

        return null;
    }

    const newDomain = filterDomains(getLink);

    const checkLink = useCallback(() => {
        if (newDomain === '' || newDomain === null) {
            { language === 'EN-US' ? setMessage('Check that your link is not tampered with') : setMessage('Verifique se o seu link não está modificado') }
            document.querySelector('#logo').style.color = '#fff';
        } else if (listURLs.some(domain => newDomain.includes(domain.toLowerCase()))) {
            { language === 'EN-US' ? setMessage('Keep calm, this link is safe!') : setMessage('Fique calmo, este link é seguro!') }
            document.querySelector('#logo').style.color = '#70db90';
        } else {
            { language === 'EN-US' ? setMessage('Hey! Be careful, this link is strange and could be a scam!') : setMessage('Ei! Tenha cuidado, este link é estranho e pode ser uma farsa!') }
            document.querySelector('#logo').style.color = '#db7070';
        }
    }, [language, newDomain]);

    useEffect(() => {
        checkLink();
    }, [checkLink]);

    return (
        <MainDetails>
            <h1 id="logo">SC4MM3D</h1>
            <p className="message">{message}</p>

            <form onSubmit={(e) => { e.preventDefault(); checkLink(); }}>
                {
                    language === 'EN-US' ?
                        (<input type="text" name="input" placeholder='Write or paste here the link of the store or product that is in doubt'
                            value={getLink} onChange={(e) => setGetLink(e.target.value)} />) :
                        (<input type="text" name="input" placeholder='Escreva ou cole aqui o link da loja ou produto que está em dúvida'
                            value={getLink} onChange={(e) => setGetLink(e.target.value)} />)
                }
            </form>
            <div className="howWorks">
                <h3><span onClick={hiddenHowToWorks} className="closeBtn">✕</span> {language === 'EN-US' ? 'How It Works?' : 'Como isso funciona?'}</h3>

                <span id="howWorks">
                    <p>
                        {language === 'EN-US' ?
                            'Imagine that you have just received a link via email or from a shortener, directing you to a product that you are eager to purchase. However, the question arises: is this link legitimate? Don\'t worry!'
                            :
                            'Imagine que você acaba de receber um link por e-mail ou de um encurtador, direcionando para um produto que você está ansioso para adquirir. Porém, surge a dúvida: será que esse link é legítimo? Não se preocupe!'}
                    </p>
                    <p id="howWorks">
                        {language === 'EN-US' ?
                            'Our platform is here to clear up all uncertainties. We analyze the link in our database and if it receives the green markup, it is a sign that the link is safe. Otherwise, if it does not get this validation, it is better to consider it suspicious and we recommend that you avoid using it for shopping. Remember, we only evaluate links for purchases'
                            :
                            'Nossa plataforma está aqui para esclarecer todas as incertezas. Analisamos o link em nosso banco de dados e se ele receber a marcação verde, é um sinal de que o link é seguro. Caso contrário, se ele não obtiver essa validação, é melhor considerá-lo suspeito e recomendamos que você evite utilizá-lo para fazer compras. Lembrando, apenas avaliamos links para compras'}
                    </p>
                </span>
                <p>Developed by Kalify Inc</p>
            </div>
            <div className="buttons">
                <button onClick={() => setLanguage('PT-BR')}>Português</button>
                <button onClick={() => setLanguage('EN-US')}>English</button>
            </div>
        </MainDetails>
    );
}

export default App;

const MainDetails = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;600;700;800;900&display=swap');

    h1, p, form {
        font-family: 'Montserrat', sans-serif;
    }

    h1 {
        margin-top: 5rem;
        font-weight: 800;
        font-size: 8rem;
    }

    .message {
        font-weight: 200;
        margin-top: -6rem;
    }

    form {
        input {
            height: 0.8rem;
            width: 30rem;
            border-radius: 5px;
            border: none;
            padding: 1rem;

            &:focus {
                outline: none;
            }
        }
    }

    .howWorks {
        display: flex;
        flex-direction: column;
        max-width: 45rem;
        width: 45rem;
        margin-top: 2.5rem;
        font-size: 0.9rem;
        font-weight: 200;
        text-align: justify;

        .closeBtn {
            cursor: pointer;
            color: #888;
        }
    }

    .buttons {
        button {
            margin-right: 1rem;
        }
    }
`;
