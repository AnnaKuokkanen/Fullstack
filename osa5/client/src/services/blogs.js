import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const url = baseUrl+`/${updatedObject.id}`
  const response = await axios.put(url, updatedObject)
  return response.data
}

const remove = async deletedObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('Token', config);
  const url = baseUrl+`/${deletedObject.id}`
  await axios.delete(url, config)
}

export default { getAll, create, setToken, update, remove }