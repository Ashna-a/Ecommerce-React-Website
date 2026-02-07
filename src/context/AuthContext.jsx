import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? {email: localStorage.getItem("currentUserEmail")} : null);

    const signup = (email,password) => {
        const users = JSON.parse(localStorage?.getItem("users")) || [];
        const newUser = {email, password};
        if(users?.find((user)=>user.email === email)){
            return {sucess: false , error: "Email already exists"}
        }
        users?.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);
        setUser({email});
        return {sucess:true}
    }

    const login = (email,password) => {
        const users = JSON.parse(localStorage?.getItem('users'));
        const user = users?.find((u) => u.email === email && u.password === password);
        if(!user) {
            return  {sucess : false , error : "Invalid email or passowrd"}
        }

        localStorage.setItem("currentUserEmail", email);
        setUser({email});
        return {sucess: true}
        
    }

    const logout = () => {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return <AuthContext.Provider value={{signup, user, logout, login}}> {children} </AuthContext.Provider>
}

export default AuthProvider;