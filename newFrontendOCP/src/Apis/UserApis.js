import axios from "axios";
const API = axios.create({baseURL:'http://localhost:4000'})
export const getUsers = (id)=>API.get(`/loginSystem/getUserById/${id}`)