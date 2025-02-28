import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NTProvider } from './lib/ntcore-react'
import App from './components/App'
import CssBaseline from '@mui/material/CssBaseline';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NTProvider uri="localhost" port={5810}>
      <App />
      <CssBaseline />
    </NTProvider>
  </StrictMode>
)
