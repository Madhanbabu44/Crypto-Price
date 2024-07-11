import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Coincontext } from "../../context/Coincontext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allcoin, currency } = useContext(Coincontext);
  const [displaycoin, setdisplaycoin] = useState([]);
  const [input, setinput] = useState("");
  const inputhandle = (event) => {
    setinput(event.target.value);
    if(event.target.value===""){setdisplaycoin(allcoin)}
  };
  const searchhandle = async (event) => {
    const coins = await allcoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setdisplaycoin(coins)
    event.preventDefault();
  };
  useEffect(() => {
    setdisplaycoin(allcoin);
  }, [allcoin]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest
          <br /> Crypto marketing
        </h1>
        <p>
          Welcome to the World's Largest Cryptocurrency market place. Sign up to
          explore more about cryptos
        </p>
        <form onSubmit={searchhandle}>
          <input
            onChange={inputhandle}
            value={input}
            type="text"
            list="coinlist"
            placeholder="search crypto..."
            required
          />
          <datalist id="coinlist">
            {allcoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market cap</p>
        </div>
        {displaycoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
                {currency.symbol}
                {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            <div>
             
             
             
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
