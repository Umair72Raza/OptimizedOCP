import axios from "axios";
const API = axios.create({baseURL:'http://localhost:4000'})
export const getMessages = (chatId)=>API.get(`/messageSystem/${chatId}`)
export const addMessage = (data) => API.post('/messageSystem/',data)