import React, { useContext, useState } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { IoMdCloudUpload } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRef } from "react";
import { userDataContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
const Customize = () => {
  const inputImage = useRef();
  const navigate = useNavigate();
  const {
    serverURL,
    userData,
    setUserData,
    frontEndImage,
    setFrontEndImage,
    backEndImage,
    setBackEndImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]">
      <MdKeyboardBackspace
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]"
        onClick={() => navigate("/")}
      />
      <h1 className="text-white mb-[30px] text-[30px] text-center">
        Select Your<span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${
            selectedImage === "input"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : ""
          }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontEndImage && (
            <IoMdCloudUpload className="text-white w-[30px] h-[30px]" />
          )}
          {frontEndImage && (
            <img src={frontEndImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage && (
        <button
          className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] cursor-pointer"
          onClick={() => navigate("/secCustomize")}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
