import axios from "axios";
const API = axios.create({baseURL:'http://localhost:4000'});
export const UserChats = (id)=>API.get(`/chatSystem/${id}`);
export const chatwitheTeacher = (teacherId,studentId)=>API.get(`/chatSystem/find/${teacherId}/${studentId}`);
export const newChatwithTeacher = (teacherId,studentId)=>API.post(`/chatSystem/`,{senderId:studentId, receiverId:teacherId});