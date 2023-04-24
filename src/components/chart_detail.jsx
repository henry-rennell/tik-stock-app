import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { useParams } from "react-router-dom"
import "./Chart_details.css"

export default function StockChartDetail({ name, setSearchResult }) {
  const [price, setPrice] = useState(0)
  const [priceTime, setPriceTime] = useState("")
  const [stockInfo, setStockInfo] = useState([])
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ])
  const [graphWidth, setGraphWidth] = useState((0.4 * window.innerWidth))

  function handleResize (){
    let windowWidth = window.innerWidth
    if(windowWidth < 500) {
      setGraphWidth(0.75 * windowWidth)
    } else {
      setGraphWidth(0.65 * windowWidth)
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  window.addEventListener('resize', handleResize)

  const params = useParams()
  name = params.ticker
  const chart = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
        foreColor: "#FFFFFF"
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        logBase: 0.1,
        min:
          (Math.min.apply(
            null,
            series["0"].data
              .map(elem => {
                if (Number(elem.y[3]) !== 0 && elem.y[3] !== null) {
                  return Math.floor(Number(elem.y[3]) * 100)
                }
              })
              .filter(elem => elem !== undefined)
          ) /
            100) *
          0.99,
        max:
          (Math.max.apply(
            null,
            series["0"].data.map(elem => Math.floor(Number(elem.y[0]) * 100))
          ) /
            100) *
          1.01,

        tooltip: {
          enabled: false,
        },
      },
    },
  }

  async function getStocks() {
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const response = await fetch(
      `https://proxy.cors.sh/https://query1.finance.yahoo.com/v8/finance/chart/${name}`,
      {
        headers: {
          "x-cors-api-key": "temp_9b9b92d25a6b1e8bad76565321cd83c8",
        },
      }
    ).then(res => res.json())
    return response
  }

  useEffect(() => {
    // function getPrice() {
    getStocks().then(data => {
      // console.log(data["chart"]["result"][0])
      setStockInfo(data["chart"]["result"][0]["meta"])
      setPrice(data.chart.result[0].meta.regularMarketPrice.toFixed(2))
      setPriceTime(
        new Date(
          data.chart.result[0].meta.regularMarketTime * 1000
        ).toLocaleTimeString()
      )
      const prices = data.chart.result[0].timestamp.map((time, index) => {
        return {
          x: new Date(time * 1000),
          y: [
            Number(
              data.chart.result[0].indicators.quote[0].open[index]
            ).toFixed(2),
            Number(
              data.chart.result[0].indicators.quote[0].high[index]
            ).toFixed(2),
            Number(data.chart.result[0].indicators.quote[0].low[index]).toFixed(
              2
            ),
            Number(
              data.chart.result[0].indicators.quote[0].close[index]
            ).toFixed(2),
          ],
        }
      })
      setSeries([
        {
          data: prices,
        },
      ])

    })
 
  }, [name])
  return (
    <div className="stock-details">
      <h2>{stockInfo["symbol"]}</h2>
      <section className="graph">
        <Chart
          options={chart.options}
          series={series}
          type="candlestick"
          width={graphWidth}
          height={400}
        />
      </section>
      <section className="information">
      <p><span>Stock Trading Symbol:</span> {stockInfo["symbol"]}</p>
      <p><span>Stock Exchange:</span> {stockInfo["exchangeName"]}</p>
      <p><span>Instrument Type:</span> {stockInfo["instrumentType"]}</p>
      <p><span>Current Price:</span> ${price}</p>
      <p><span>Stock Trading Time:</span> {priceTime}</p>
      <p><span>Previous Closing Price:</span> ${stockInfo["chartPreviousClose"]}</p>
      </section>
    </div>
  )
}
