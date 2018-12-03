import axios from 'axios';

export default {
    singup: (firstName, lastName, email, password) =>  axios.post("/sign-up", {firstName:firstName, lastName:lastName, email:email, password:password}),
    signin: (email, password) => axios.post("/sign-in", {email:email, password:password}),
    refresh: (token) => axios.post("/tokens/refresh", {token: token})
}