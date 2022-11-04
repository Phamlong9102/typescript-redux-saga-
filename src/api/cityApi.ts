import { City, ListResponse } from "../models";
import axiosClient from "./axiosClient";

const cityApi = {
    getAllCity(): Promise<ListResponse<City>> {
        const url = 'http://js-post-api.herokuapp.com/api/cities'; 
        return axiosClient.get(url, { params: {
            _page: 1, 
            _limit: 10, 
        }})
    }
}

export default cityApi;