import "./SmallStockCard.css"
import StockChart from "./chart"

export default function SmallStockCard({ ticker, isGreen }) {
  return (
    <div className="small-stock-card">
      <h3>{ticker.symbol}</h3>
      <StockChart name={ticker.symbol} />
      <footer>
        <span className="price">Price: {ticker.price}</span>
        <span className={isGreen ? "green" : "red"}>
          Change: {ticker.change}
        </span>
      </footer>
    </div>
  )
}
