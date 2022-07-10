import axios from "axios"

export const api = axios.create({
    baseURL: "https://br1.api.riotgames.com"
})