import axios from 'axios';
import api from "./api"

const instance = axios.create();


var refreshToken = () =>
    api.refresh(sessionStorage.getItem("refreshToken"));

instance.interceptors.request.use( (config)=>{

    if(sessionStorage.getItem("isAuthenticated")==="true")
    {
        var expires = (sessionStorage.getItem("expires"));
        if(Math.round((new Date()).getTime() / 1000) > (expires !==null ? parseInt(expires) : -1))
        {
            refreshToken().then(res => {
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("accessToken", res.data.accessToken);
                sessionStorage.setItem("refreshToken", res.data.refreshToken);
                sessionStorage.setItem("expires", res.data.expires);
                
                config.headers = { Authorization: `Bearer ${res.data.accessToken}`};
            });
        }
        else
        {
            var token = sessionStorage.getItem("accessToken");
            config.headers = { Authorization: `Bearer ${token}`};
        }
    }

    return config;
}, 
(error)=>{

    return error;
})


export default {
    getFoodlog: () => instance.get("/foodlog"),
    postFoodlog: (foodEntry) => instance.post("/foodlog", foodEntry),
    cancelAccessToken: () => instance.post("/tokens/cancel"),
    getProducts: (page, pageSize) => instance.get("/products", {params:{page: page, pageSize:pageSize}}),
    getProduct: (productId) => instance.get(`/produtcs/${productId}`),
    postProduct: (product) => instance.post("/products", product),
    patchProduct: (patch) => instance.patch("/products", patch)
}