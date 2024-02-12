import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUpload from "../utils/UploadImage.js";
const Signup = () => {
  const [name, setName] = useState("");
  const [image,setimage]=useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useNavigate();
  // console.log(image)
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const res = await axios.post("http://localhost:4001/Signup", {
      name,
      email,
      password,
    });
    // console.log(res);
    if(res.data.message){
        toast.success(res.data.message);
    }
    if(res){
        router("/Login")
    }
  };
  // const handleImageClick=async()=>{
  //   const formData=new FormData();
  //   formData.append("file",image);
  //   formData.append("upload_preset","u6fuaioa")
  //   // 
  //    axios.post("https://api.cloudinary.com/v1_1/dblj4xikl/image/upload",formData).then(res=>{console.log(res.data.url)});
    
  // }
  
  return (
    <div className="h-[100vh]">
      <section className="text-center text-lg-start">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right">
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form onSubmit={handlesubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            id="form3Example1"
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example1">
                            Name
                          </label>
                        </div>
                       
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>

                    <div className="flex justify-center">
                      <div>Already had an Account ?</div>
                      <span className="px-3">
                        <button onClick={()=>{router("/Login")}}>Sign-In</button>
                      </span>
                    </div>
                  </form>
                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 hidden lg:block mb-lg-0">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                className="w-[80%] h-[70%] rounded-4 shadow-4"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
