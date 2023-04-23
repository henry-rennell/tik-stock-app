import { useEffect, useState } from "react"
import tickers from "../data/tickers"
import SmallStockCard from "./SmallStockCard"
import "./GetStocks.css"
export default function GetStocks() {
    const [Tickers, setTickers] = useState([])

    const getInitialTickers = () => {
            for(let i = 0; i <= 5; i++) {
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
    <section>
      <div className="stocks">
        {Tickers.map(ticker => {
          return <SmallStockCard ticker={ticker} isGreen={ticker.change > 0? true : false}  key={ticker.id}/>
        })}
      </div>
        <button onClick={handleScrollDown}>click MEEE</button>
    </section>
  )
}

