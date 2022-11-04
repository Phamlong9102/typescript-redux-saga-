import { ListParams, ListResponse, Student } from "../models";
import axiosClient from "./axiosClient";

const studentApi = {
    getAllStudent(): Promise<ListResponse<Student>> {
        const url = 'http://js-post-api.herokuapp.com/api/students'; 
        return axiosClient.get(url)
    }, 
    getStudentById(id: string): Promise<Student> {
        const url = `http://js-post-api.herokuapp.com/api/students/${id}`; 
        return axiosClient.get(url)
    }, 
    addStudent(data: Student): Promise<Student> {
        const url = 'http://js-post-api.herokuapp.com/api/students'; 
        return axiosClient.post(url, data)
    }, 
    updateStudent(data: Student): Promise<Student> {
        const url = 'http://js-post-api.herokuapp.com/api/students'; 
        return axiosClient.patch(url, data)
    },
    removeStudent(id: string): Promise<any> {
        const url = `http://js-post-api.herokuapp.com/api/students/${id}`; 
        return axiosClient.delete(url)
    } 
}

export default studentApi;