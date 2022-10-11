import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { historyRef } from "../layout/App";
import { Activity } from "../models/activity";
import { store } from "../stores/store";


axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError<any>) => {

    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                //@ts-ignore
                historyRef.current.push('/not-found')
            }
            if (data.error) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 404:
            //@ts-ignore
            historyRef.current.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            //@ts-ignore
            historyRef.current.push('/server-error');
            break;
    }
    return Promise.reject(error);
})
const responseBody = <T>(res: AxiosResponse<T>) => res.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;