import {defineConfig, ConfigEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";
import {loadEnv} from "vite";

export default ({mode}: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        plugins: [
            react(),
            createHtmlPlugin({
                inject: {
                    data: {
                        title: env.VITE_SITE_TITLE
                    }
                }
            })
        ]
    })
}

