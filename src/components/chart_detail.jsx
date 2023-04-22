import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

export default function StockChart(props) {
  const [price, setPrice] = useState(0)
  const [priceTime, setPriceTime] = useState("")
  const [stockInfo, setStockInfo] = useState([])
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ])
  const chart = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
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
        min: price * 0.97,
        max: price * 1.03,

        tooltip: {
          enabled: false,
        },
      },
    },
  }

  async function getStocks() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const response = await fetch(
      `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/${props.name}`
    ).then(res => res.json())
    return response
  }

  useEffect(() => {
    let timeoutId
    // function getPrice() {
    getStocks().then(data => {
      console.log(data["chart"]["result"][0])
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
      // chart.series = series

      // console.log(data["Weekly Time Series"]["2023-04-19"]["4. close"])
      //

      // timeoutId = setTimeout(() => {
      //   getPrice()
      // }, 10000)
    })
    // }

    // timeoutId = setTimeout(() => {
    //   getPrice()
    // }, 10000)

    // return () => {
    //   clearTimeout(timeoutId)
    // }
  }, [])

  console.log(stockInfo)
  console.log(priceTime)
  return (
    <div className="App">
      <Chart
        options={chart.options}
        // series={chart.series}
        series={series}
        type="candlestick"
        width={500}
        height={220}
      />
      {/* <p>Stock Trading Symbol:{stockInfo["symbol"]}</p>
      <p>Stock Exchange: {stockInfo["exchangeName"]}</p>
      <p>Instrument Type: {stockInfo["instrumentType"]}</p>
      <p>Current Price:{price}</p>
      <p>Stock Trading Time :{priceTime}</p>
      <p>Previous Closing Price :{stockInfo["chartPreviousClose"]}</p> */}
    </div>
  )
}
