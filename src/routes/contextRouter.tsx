import {ComponentType} from "react";
import {RouteContext, RouteContextProps} from '../utils/context'
import * as React from "react";

interface ContextRouterProps {
    children: ComponentType
    name: string
}

function ContextElement(props: ContextRouterProps) {

    const contextValue: RouteContextProps = {
        name: props.name,
    }

    const Element = props.children

    return (
        <RouteContext.Provider value={contextValue}>
            <Element />
        </RouteContext.Provider>
    )
}

export default ContextElement