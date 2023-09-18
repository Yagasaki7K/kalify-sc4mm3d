import styled from 'styled-components';
import listURLs from './links';
import { useState, useEffect, useCallback } from 'react';

function App() {
    const [getLink, setGetLink] = useState('');
    const [message, setMessage] = useState('Check that your link is not tampered with');

    function filterDomains(url) {
        const dominioRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/g;
        const dominioMatch = dominioRegex.exec(url);

        if (dominioMatch && dominioMatch.length > 1) {
            return dominioMatch[1];
        }

        return null;
    }

    const newDomain = filterDomains(getLink).toLowerCase();

    console.log(newDomain); // Output: link.com.br

    const checkLink = useCallback(() => {

        if (newDomain === '' || newDomain === null) {
            setMessage('Check that your link is not tampered with');
            document.querySelector('#logo').style.color = '#fff';
        } else if (listURLs.includes(newDomain)) {
            setMessage('Keep calm, this link is safe!');
            document.querySelector('#logo').style.color = '#70db90';
        } else {
            setMessage('Hey! Be careful, this link is strange and could be a scam!');
            document.querySelector('#logo').style.color = '#db7070';
        }
    }, [newDomain]);

    useEffect(() => {
        checkLink();
    }, [checkLink]);

    return (
        <MainDetails>
            <h1 id="logo">SP4MM3D</h1>
            <p>{message}</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    checkLink();
                }}
            >
                <input
                    type="text"
                    name="input"
                    placeholder='https://www.amazon.com.br/Echo-Dot-5%C2%AA-gera%C3%A7%C3%A3o-Cor-Preta/dp/B09B8VGCR8/'
                    value={getLink}
                    onChange={(e) => setGetLink(e.target.value)}
                />
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
