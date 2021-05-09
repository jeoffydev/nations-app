import jwtDecode from 'jwt-decode';     

//Set default landing page for loggin users
const defaultLandingPage = '/admin/my-rosters';

export function checkLogin(props, propsmain){  
        const data = getCurrentUser();    
        
        if(!data ){ 
            props.history.push('/')   
            return;
        } 
           
        return data;  
} 
 
export function authAdminAccess(props){

    const login = checkLogin(props);  
 
    if(!login){
        props.history.push('/')  
        return;
    } 
      
    const {role} = getCurrentUser();  
    if(role != 'Admin'){
        alert("Sorry, for admin access only!")
        props.history.push(defaultLandingPage)
    }  
    
}

export function getCurrentUser(){ 
    try{
        const jwt = localStorage.getItem('token'); 
        return jwtDecode(jwt);
    }
    catch(e){
        return null;
    } 
} 

export function getUserRole(){
    try{
        const { role }= getCurrentUser();
        return role;
    }
    catch(e){
        return null;
    }  
    
}

export function getJwt(){ 
    return localStorage.getItem('token');
}


export function login(data){
    localStorage.setItem('token', data.token);
    window.location.href= defaultLandingPage;
}

export function logout(){
    localStorage.removeItem('token');
    window.location.href="/";
}

 

export default{
    getCurrentUser,
    getJwt,
    checkLogin,
    authAdminAccess,
    getUserRole 
}
