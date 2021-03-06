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

const updateBlog = async (blog) => {
   try {
     console.log("token", token)
     const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
     return response.data
   } catch(e) {
     console.log(e.response.data.error)
   }
}

const deleteBlog = async (blog) => {
    try {
      const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
      return response.data
    } catch (e) {
    }
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }
