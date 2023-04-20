

export default function GetStocks (props) {

    const getAapl = () => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${process.env.REACT_APP_VANTAGE_KEY}`)
            .then(res => res.json())
            .then(res => console.log(res))
    }



    return (
        <div className="stocks">
            <p onClick={getAapl}>Stocks!</p>
        </div>
    )
}
