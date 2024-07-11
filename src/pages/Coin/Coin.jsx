import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import Line from "../../components/Linechard/Line";
import { Coincontext } from "../../context/Coincontext";
const Coin = () => {
  const { coinId } = useParams();
  const [coindat, setconidat] = useState();
  const [hist, sethist] = useState();
  const { currency } = useContext(Coincontext);

  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setconidat(response))
      .catch((err) => console.error(err));
  };

  const fetchhistdata = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => sethist(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchhistdata();
  }, [currency]);
  if ((coindat && hist)) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coindat.image.large} alt="" />
          <p>
            <b>
              {coindat.name} {coindat.symbol.toUpperCase()}
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <Line hist={hist} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindat.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coindat.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {coindat.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}
              {coindat.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {coindat.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
