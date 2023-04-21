import { useEffect, useState } from "react"
import tickers from "../data/tickers"
import SmallStockCard from "./SmallStockCard"

export default function GetStocks() {
    const [Tickers, setTickers] = useState([])

    const getInitialTickers = () => {
            for(let i = 0; i <= 3; i++) {
                let ticker = tickers();
                setTickers(prevTickers => [...prevTickers, ticker])
            }
    }

    useEffect(() => {
        getInitialTickers()
    }, [])

  const handleScrollDown = () => {
    getInitialTickers();
  }

  return (
    <div className="stocks">
      {Tickers.map(ticker => {
        return <SmallStockCard ticker={ticker} isGreen={ticker.change > 0? true : false}  key={ticker.id}/>
      })}
      <button onClick={handleScrollDown}>click MEEE</button>

    </div>
  )
}

