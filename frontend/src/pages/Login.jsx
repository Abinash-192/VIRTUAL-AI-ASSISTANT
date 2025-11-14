import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/userContext";
import axios from "axios";
import { useContext } from "react";

const login = () => {
  const [showPassword, setShowPassword] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const[loading,setLoading] = useState("")
  const { serverURL,userData, setUserData } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true)
    try {
      let result = await axios.post(
        `${serverURL}/api/auth/login`,
        {  email, password },
        { withCredentials: true }
      );
      setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error);
      setUserData(null)
      setErr(error.response.data.message);
      setLoading(false)
    }
  };
  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Login To <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Enter Your email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full h-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoIosEye
              className="absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err?.length > 0 && <p className="text-red-500">*{err}</p>}

        <button className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px]" disabled={loading}>
          {loading ? "Loading...." : "Login"}
        </button>
        <p className="text-white text-[18px]">
          Want To Create New Account ?
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default login;
