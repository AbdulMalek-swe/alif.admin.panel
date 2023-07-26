import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, StyledEngineProvider,ThemeProvider ,createTheme} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import route from 'routes/Route';
import { Provider } from 'react-redux';
import store from 'rtk/store/store';
import axios from 'apiService/axios';
import { addUserActions } from 'rtk/feature/addUserSlice';
import 'react-quill/dist/quill.snow.css';
const App = () => {
  useEffect(()=>{
   async function profileGet(){
    try {
      const res = await axios.get('/user/profile')
      console.log(res);
         store.dispatch(addUserActions.addUser(res.data.data))
     } catch (error) {
      // console.log(error);
      // removeCookie("token", { path: "/" });
     }
   }
   profileGet()
  },[])
  return (
    <RouterProvider router={route}/>
  );
};
 
 const theme = createTheme({

 })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer
      
      />
      <Provider store={store}>
      <App/>
      </Provider>
     
    </ThemeProvider>
   </StyledEngineProvider>
  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
