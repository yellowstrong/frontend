/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_TITLE: string
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
