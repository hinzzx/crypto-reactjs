import "./index.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const coinsFilter = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <div className="App">
      <div className="header">
        <label> Search for any crypto: </label>
        <input placeholder="Example: bitcoin" type="text" onChange={(event) => {setSearch(event.target.value)}}>
        </input>
        </div>
      <div className="display-info">
        {coinsFilter.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
