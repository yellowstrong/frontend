import docker from "./docker.ts";
import development from "./development.ts";

export interface ConfigProperties {
    SITE_TITLE: string
    BASE_API: string
}

const env = import.meta.env.MODE
const configs: { [key: string]: ConfigProperties } = {
    development,
    docker
}

export default configs[env]