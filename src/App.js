import GetStocks from "./components/GetStocks"
import StockChart from "./components/chart"
import "./App.css"

function App() {
  return (
    <div className="App">
      <GetStocks />
      <SearchBar />
      <StockChart />
    </div>
  )
}

export default App
