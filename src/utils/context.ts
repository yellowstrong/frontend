import {createContext} from "react-activation";


export interface RouteContextProps {
    name: string
}

export const RouteContext = createContext<RouteContextProps | undefined>(undefined)