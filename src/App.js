import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Search} from '@material-ui/icons';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(memes)
  
  async function getMemes() {
    setLoading(true)
    setMemes([])
    const key = 'hf45TcK60pCyufRR1rScRDY6xCOqDjDe'
    const baseurl = 'https://api.giphy.com/v1/gifs/search?'
    let url = baseurl + 'api_key=' + key
    url += '&q='+text
    const response = await fetch(url)
    const body = await response.json()
    console.log(body.data)
    setMemes(body.data)
    setText('')
    setLoading(false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Generator</h1>
        <div className='input-wrap'>
          <div className='input'>
          <TextField  fullWidth
            label="Search for memes" variant="outlined" 
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}
          />
          </div>
          <Button variant="contained" color="primary" onClick={getMemes}>
            <Search />
          </Button>
        </div>
      
      </header>
      
      {loading && <LinearProgress />}

      <div className='meme-list'>
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>

    </div>
  );
}

function Meme({title, images}) {
  return <div className='meme' onClick={()=>window.open(images.fixed_height.url, '_blank')}>
    <div className='meme-title'>{title}</div>
    <img height='200' src={images.fixed_height.url} alt='meme'/>
  </div>
}

export default App;
