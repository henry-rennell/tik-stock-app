import { useState } from "react"
import "./SmallStockCard.css"

export default function SmallStockCard({ ticker, isGreen }) {

    return (
            <div className="small-stock-card">
                <h3>{ticker.symbol}</h3>
                <footer>
                <span className="price">Price: {ticker.price}</span><span className={isGreen? "green" : "red"}>Change: {ticker.change}</span>
                </footer>
            </div>
    )
}