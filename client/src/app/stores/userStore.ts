import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { historyRef } from "../layout/App";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any
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
            this.startRefreshTokenTimer(user);
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
            this.startRefreshTokenTimer(user);
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

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }
    refreshToken = async () => {
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (e) {
            console.log(e);
        }
    }
    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }
    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}