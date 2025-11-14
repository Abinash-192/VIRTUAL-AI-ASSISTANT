import React, { useContext, useState } from "react";
import { userDataContext } from "../Context/userContext";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SecondCustomize = () => {
  const [loading, setLoading] = useState(false);
  const { userData, backendImage, selectedImage, serverURL, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistanceName] = useState(
    userData?.AssistantName || ""
  );
  const navigate = useNavigate();
  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageURL", selectedImage);
      }
      const result = await axios.post(
        `${serverURL}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result.data);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative">
      <MdKeyboardBackspace
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]"
        onClick={() => navigate("/customize")}
      />

      <h1 className="text-white mb-[30px] text-[30px] text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="email"
        placeholder="eg.shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange={(e) => setAssistanceName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[300px] mt-[30px] h-[60px] bg-blue-300 text-black rounded-full font-semibold text-[20px] cursor-pointer"
          disabled={loading}
          onClick={() => {
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Create Assistant" : "loading..."}
        </button>
      )}
    </div>
  );
};

export default SecondCustomize;
