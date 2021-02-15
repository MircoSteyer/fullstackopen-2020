import axios from 'axios'

const baseUrl = '/api/blogs'
let token = ""
let config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const setToken = (newToken) => {
  token = newToken
  config = {...config, headers: {Authorization: `Bearer ${newToken}`}}
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  try {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (e) {
    console.log(e.response.data.error)
  }
}

export default { getAll, createBlog, setToken }
