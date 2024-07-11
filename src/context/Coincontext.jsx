import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext();

const CoincontextProvider = (props) => {
  const [allcoin, setallcoin] = useState([]);
  const [currency, setcurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Hdz3zWopSxJZqM8JtxkXBoQM",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setallcoin(response))
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    fetchAllCoin();
  }, [currency]);
  
  const contexvalue = { allcoin, currency, setcurrency };
  return (
    <Coincontext.Provider value={contexvalue}>
      {props.children}
    </Coincontext.Provider>
  );
};
export default CoincontextProvider;
