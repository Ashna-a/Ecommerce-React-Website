import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [mode, setMode] = useState("signup");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, user, logout, login} = useContext(AuthContext)

    const onSubmit = (data) => {
        setError(null);
        let result;
        if( mode === "signup") {
            result = signup(data?.email, data?.password)
        } else {
            result = login(data?.email, data?.password)
        }  
        if(result.sucess === true ) {
            navigate("/");
        } else {
            setError(result?.error)
        }
    }


    return (
        <div className="page">
            <div className="conatiner">
                <div className="auth-container">
                    {user && <p> User is logged In with email : {user?.email} </p>}
                     {user?.email && <button onClick={logout}> Logout </button>} 
                    <h1 className="page-title">
                       {mode === "signup" ? "Sign Up" : "Login" } 
                    </h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message"> {error} </div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email:
                                <input className="form-input" type="email" id="email"  {...register("email", {required : "Email is required"})} /> 
                            </label>
                            {errors?.email && <span className="form-error"> {errors?.email?.message} </span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password:
                                <input className="form-input" type="password" id="password" 
                                    {...register("password",
                                    {
                                        required : "Password is required", 
                                        minLength: { value: 6, message: "Password must be atleast 6 characters" }, 
                                        maxLength: {value: 12, message: "Password must be atmost 12 characters"}
                                    })} /> 
                            </label>
                            {errors?.password && <span className="form-error"> {errors?.password?.message} </span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large"> {mode === "signup" ? "Sign Up" : "Login"}  </button>
                        <div className="auth-switch">
                            {mode === "signup" ? 
                                <p> Already Have an Account? <span className="auth-link" onClick={() => setMode("login")}> Login </span></p> : 
                                <p> Don't Have an Account? <span className="auth-link" onClick={() => setMode("signup")}> Sign Up </span></p>
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;