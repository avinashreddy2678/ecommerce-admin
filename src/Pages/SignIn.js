import React, { useState } from "react";
import "../App.css";
import {useCookies} from 'react-cookie'
import * as mdb from "mdb-ui-kit"; // lib
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
window.mdb = mdb;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [_,setCookie] = useCookies(["access_token"]);
  const [password, setPassword] = useState("");
  const router=useNavigate();
  const handlesubmit = async(e) => {
    e.preventDefault();
    const res=await axios.post("http://localhost:4001/Login",{
      email,
      password
    });
    // console.log(res);
    if(res){
      if(res.status===202){
        toast.error("user not found")
      }
      if(res.status===204){
        toast.error("Password not corrext");
      }
      if(res.status===200){
        toast.success(res.data.message);
        window.localStorage.setItem("userId",res.data.userId);
        setEmail("")
        setPassword("")
        router("/");
        setCookie("access_token", res.data.token);
      }
    }
    
  };
  return (
    <div className="w-full h-[100vh]">
      <section className="w-[70%] h-[80%] pt-20 m-auto text-center text-lg-start">
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div className="col-lg-8">
              <h1 className="text-center">Endha Thambi Sign-In Karo</h1>
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handlesubmit}>
                  <div className="form-outline mb-4">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      id="form2Example1"
                      className="form-control"
                      value={email}
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>
                  <div className="flex">
                  <div>Not there a Account ? </div> <button onClick={()=>{router("/Signup")}} className="text-blue">SignUp</button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
