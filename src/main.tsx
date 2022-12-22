import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {Auth0Provider} from "@auth0/auth0-react";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider domain={"dev-yr4ucopn5ludqjmf.eu.auth0.com"} clientId={"INvTXeRkny58jATZuqATw4iNHNgdudXO"}
                       redirectUri={window.location.origin} audience="homepage-sebastian-api"
                       scope={"openId profile email"} useRefreshTokens={true} cacheLocation="localstorage">
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </Auth0Provider>
    </React.StrictMode>,
)
