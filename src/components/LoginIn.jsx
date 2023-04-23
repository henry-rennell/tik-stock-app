import { useState } from "react"
import { users } from "../data/users"
import "./LoginIn.css"
export default function LoginIn(props) {
  const [message, setMessage] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    let username = e.target[0].value
    let testArr = users.map(user => user.userName)

    if (testArr.includes(username)) {
      props.setUser(username)
    } else {
      setMessage("wrong username or password, please type in again")
    }

    // props.setUser(e.target[0].value)
    // props.setUser()
  }
  return (
    <section>
    <div className="Login">
    <img src="/tikstock_logo.png" alt="" className="logo"/>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="">Password:</label>
        <input type="password" />
        <button>login</button>
        <p>{message}</p>
      </form>
    </div>
    </section>
  )
}
