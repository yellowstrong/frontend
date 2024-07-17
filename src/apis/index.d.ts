declare interface Routes {
    [path: string]: {
        id?: number
        name?: string
        component?: React.ComponentType,
        render?: () => React.ReactNode,
        resources?: string[]
    }
}

declare interface UserLogin {
    username: string
    password: string
}

declare interface TokenInfo {
    xToken: string
    expired: number
}

declare interface UserInfo {
    id: number
    username: string
    avatar: string
    admin: boolean
    disabled: boolean
}