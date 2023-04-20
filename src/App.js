import GetStocks from "./components/GetStocks"
import StockChart from "./components/chart"
import "./App.css"

function App() {
  return (
    <div className="App">
      <GetStocks />
      <StockChart />
    </div>
  )
}

export default App
