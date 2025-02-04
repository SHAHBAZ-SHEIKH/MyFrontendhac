import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { DarkModeContextProvider } from './context/darkModeContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <DarkModeContextProvider>
        <App />
        </DarkModeContextProvider>
      </PersistGate>

    </Provider>
  </StrictMode>,
)
