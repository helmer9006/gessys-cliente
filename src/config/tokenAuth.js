import clienteAxios from './axios';


const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete clienteAxios.defaults.common['Authorization'];
    }
}


export default tokenAuth;