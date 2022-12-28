import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const logOriginal = console.log;
const excludeItems = ["bail for","get scope for","get scope for"];
console.log = (arg0,...args) => {
  if(typeof arg0 === "string" && !excludeItems.some(x => arg0.startsWith(x))){
    logOriginal(arg0,...args)
  }
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
