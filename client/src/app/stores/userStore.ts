import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { historyRef } from "../layout/App";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                //@ts-ignore
                historyRef.current.push('/activities');
                store.modalStore.closeModal();
            })
        } catch (e) {
            throw e;
        }
    }
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        //@ts-ignore
        historyRef.current.push('/');
    }
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (e) {
            console.log(e);
        }
    }
    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                //@ts-ignore
                historyRef.current.push('/activities');
                store.modalStore.closeModal();
            })
        } catch (e) {
            throw e;
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image
    }
}