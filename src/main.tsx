import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "~/components/providers/auth"
import { ReactQueryProvider } from "~/components/providers/react-query"
import { App } from "./app"

// biome-ignore lint/style/noNonNullAssertion: root is always present
const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <Toaster toastOptions={{ duration: 1500 }} />
    <ReactQueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>
)
