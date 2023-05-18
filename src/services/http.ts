import axios from "axios"

console.log(process.env.REACT_APP_HOST_URL)
export default axios.create({
  baseURL: `${process.env.REACT_APP_HOST_URL}`,
  headers: {
    "Content-type": "application/json",
  },
})
