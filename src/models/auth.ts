import Cookies from "js-cookie";
import {RootModel} from "./index";
import * as api from "../apis/auth"
import {createModel} from "@rematch/core";

interface AuthState {
    token?: TokenInfo
    user?: UserInfo
}

const initAuthState: AuthState = {
    token: Cookies.get("token") ? JSON.parse(Cookies.get("token")!) as TokenInfo : undefined,
    user: undefined
}

export const auth = createModel<RootModel>()({
    state: initAuthState,
    reducers: {
        setToken: (state: AuthState, payload?: TokenInfo) => ({...state, token: payload}),
        setUser: (state: AuthState, payload?: UserInfo) => ({...state, user: payload}),
    },
    effects: (dispatch) => ({
        async login(userLogin: UserLogin) {
            const response = await api.login(userLogin)
            const token: TokenInfo = {
                xToken: response.data.data.x_token,
                expired: response.data.data.expired,
            }

            dispatch.auth.setToken(token)
            Cookies.set("token", JSON.stringify(token), {expires: token.expired})
        },
        async getUserInfo() {
            const response = await api.getUserInfo()
            const user: UserInfo = response.data.data
            dispatch.auth.setUser(user)
        },
        async logout() {
            Cookies.remove("token")
            dispatch.auth.setToken(undefined)
        }
    })
})




