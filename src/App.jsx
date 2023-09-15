import styled from 'styled-components';
import unSpammed from './links';
import { useState } from 'react';

function App() {
    const [getLink, setGetLink] = useState('');
    const [message, setMessage] = useState('Check that your link is not tampered with');

    function removeUnnecessaryUrl(url) {
        const lastBarIndex = url.lastIndexOf('/');
        if (lastBarIndex !== -1) {
            return url.substring(0, lastBarIndex);
        }
        return url;
    }

    function checkLink() {
        const urlWithoutBar = removeUnnecessaryUrl(getLink);
        console.log(urlWithoutBar)

        if (unSpammed.includes(urlWithoutBar)) {
            setMessage('Keep calm, this link is safe!');
            document.querySelector('#logo').style.color = '#70db90';
        } else {
            setMessage('Hey! Be careful, this link is strange and could be a scam!');
            document.querySelector('#logo').style.color = '#db7070';
        }
    }

    return (
        <MainDetails>
            <h1 id="logo">SP4MM3D</h1>
            <p>{message}</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="input"
                    id="input"
                    onChange={(e) => setGetLink(e.target.value)}
                    placeholder='https://www.amazon.com.br/Echo-Dot-5%C2%AA-gera%C3%A7%C3%A3o-Cor-Preta/dp/B09B8VGCR8/'
                />
                <button type="button" onClick={checkLink}>SP4MM3D?</button>
            </form>
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
    font-weight: 800;
    font-size: 8rem;
  }

  p {
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
`;
