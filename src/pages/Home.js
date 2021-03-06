import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Form from '../Components/Form';
import Result from '../Components/Results/Result';

const Home = () => {
  const [url, setUrl] = useState('')  
  const [resultUrl, setResultUrl] = useState('')
  const [links, setLinks] = useState([])

  useEffect(() => {
    if (localStorage.getItem('links')) {      
      setLinks(JSON.parse(localStorage.getItem('links')))
    }
  }, [])
  useEffect(() => {    
    if (links.length > 0) {
      localStorage.setItem('links', JSON.stringify(links))
    }
  }, [links, setLinks])
  const updateInputBox = (e) => {
    let el = e.target;
    setUrl(el.value);        
  }
  const shortenLink = (e) => {
    e.preventDefault();    
    let link = encodeURIComponent(url).replace(/%20/, '+');
    fetch('https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",        
      },      
      body: 'url=' + link
    })
      .then(response => {
        return response.json()
      })
      .then(result => {          
          let result_url = result.result_url          
          setResultUrl(result_url)
          setLinks([...links, {resultUrl: result_url, url}])          
      })
      .catch(error => console.log(error))
      
      
  }    
  return (
    <div className="container">
      <div className="container__landing">
        <h2>Shorten <span className="bg">IT</span></h2>
        <p>Shorten all your links <span className="underline">with ease</span></p>
        <Form          
          url={url}
          onSubmit={shortenLink}
          updateBox={updateInputBox}
          />               
      </div>
      <div className="container__result">
        <h3>Work So Far</h3>        
        { (url && resultUrl) ?
            <Result
              input={url}
              output={resultUrl}
          />
        : <p>You haven't used me yet<span role="img" aria-label="">😎</span></p>
        }          
      </div>  
      <p>
        <Link to="/links">Check Out All Your Processed links</Link>
      </p>
    </div>
  )
}
  

export default Home

