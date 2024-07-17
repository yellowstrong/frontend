import {init, Models, RematchRootState, RematchDispatch} from "@rematch/core";
import loadingPlugin, {ExtraModelsFromLoading} from "@rematch/loading";
import {auth} from "./auth";

export interface RootModel extends Models<RootModel> {
    auth: typeof auth
}

type FullModel = ExtraModelsFromLoading<RootModel>

const models: RootModel = {
    auth
}

export const store = init<RootModel, FullModel>({
    models: models,
    plugins: [loadingPlugin()]
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>