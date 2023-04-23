import "./SmallStockCard.css"
import StockChart from "./Chart"
import { Link, useNavigate } from "react-router-dom"

export default function SmallStockCard({ ticker, isGreen }) {
  const navigate = useNavigate()

  const handleClick = e => {
    navigate(`/stocks/${ticker.symbol}`)
  }

  return (
    <div className="small-stock-card">
      <h3 className="stock-symbol" onClick={handleClick}>{ticker.symbol}</h3>
      <StockChart name={ticker.symbol} />
    </div>
  )
}
