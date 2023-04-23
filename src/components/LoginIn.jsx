import { useState } from "react"
import { users } from "../data/users"

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
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">username</label>
        <input type="text" name="username" />
        <label htmlFor="">password</label>
        <input type="password" />
        <button>login</button>
        <p>{message}</p>
      </form>
    </div>
  )
}
