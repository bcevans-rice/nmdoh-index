/// <reference types="vite/client" />
declare const __APP_VERSION__: string

interface ImportMetaEnv {
    readonly VITE_APP_MODE: string
    readonly VITE_LAMBDAURL_SERVICE: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}