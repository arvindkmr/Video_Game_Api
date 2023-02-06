import './App.css';
import {useEffect, useState} from 'react'
function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [maxValue, setMaxValue] = useState(1);
  const [gameList, setGameList] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);


  
  const searchGame =()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=${maxValue}`)
    .then((response)=>response.json())
    .then((data)=>{setGameList(data)})
  }
    useEffect(()=>{
      fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`)
      .then((response)=>response.json())
      .then((data)=>{setGameDeals(data)})
    },[])
  return (
    <div className="App-header">
    <div className="search_section">
      <h1>Search for a GAME!!</h1>
      <input type="text" className="input" placeholder="PUBG..." onChange={(event)=> setGameTitle(event.target.value)}/>
      <input type="text" className="input" placeholder="Max array size(default=1)" onChange={(event)=> setMaxValue(event.target.value)}/>
      <button className='searchBtn' onClick={searchGame}>Search Game by Title</button>
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
          <h2 style={{textAlign:"center"}}>
              Latest Games
              <span role="img" aria-label="fire emoji"> 🔥</span>
          </h2>
          <div className="games">
                {gameDeals.map((gamedata, key)=>{
                return <div className="game" key={key}>
                <h2> {gamedata.title}</h2>
                <p>Normal Price : {gamedata.normalPrice}</p>
                <p>Deal Price : {gamedata.salePrice}</p>
                <h3>USE SAVE {gamedata.savings.substring(0,2)}%</h3>
                </div>
                })}
          </div>
      </div>
    </div>
  );
}

export default App;
