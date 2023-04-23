import "./SmallStockCard.css"
import StockChart from "./Chart"

export default function SmallStockCard({ ticker, isGreen }) {
  return (
    <div className="small-stock-card">
      <h3>{ticker.symbol}</h3>
      <StockChart name={ticker.symbol} />
    </div>
  )
}
