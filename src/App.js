import './App.css';
import {useState} from 'react'
function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [gameList, setGameList] = useState([]);

  
  const searchGame =()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`)
    .then((response)=>response.json())
    .then((data)=>{setGameList(data)})
  }
  return (
    <div className="App-header">
    <div className="search_section">
      <h1>Search for a GAME!!</h1>
      <input type="text" className="input" placeholder="PUBG..." onChange={(event)=> setGameTitle(event.target.value)}/>
      <button className='searchBtn' onClick={searchGame}>Search Game Title</button>
    </div>
    <div className="games">
      {gameList.map((gamedata, key)=>{
      return <div className="game" key={key}>
      <h2> {gamedata.external}</h2>
      <img src={gamedata.thumb} alt="loading.." />
      <h3>Price : {gamedata.cheapest}</h3>
      </div>
      })}
    </div>
      <div className="deal_section">
        Latest Games
          <span role="img" aria-label="fire emoji">
                  🔥
          </span>
      </div>
    </div>
  );
}

export default App;
