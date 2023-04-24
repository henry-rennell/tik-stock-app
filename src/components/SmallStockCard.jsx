import "./SmallStockCard.css"
import StockChart from "./Chart"
import { useNavigate } from "react-router-dom"

export default function SmallStockCard({ ticker, setPortfolioArr }) {
  const navigate = useNavigate()
  const handleClick = e => {
    navigate(`/stocks/${ticker.symbol}`)
  }

  const addPortfolio = () => {
    setPortfolioArr(previousePortfolioArr => [
      ...previousePortfolioArr,
      ticker.symbol,
    ])
  }

  return (
    <div className="small-stock-card">
      <div>
        <footer>
          <h3 className="stock-symbol" onClick={handleClick}>
            {ticker.symbol}
          </h3>
          <span>
            <button onClick={addPortfolio}>Add To Portfolio</button>
          </span>
        </footer>
      </div>
      <StockChart name={ticker.symbol} />
    </div>
  )
}
