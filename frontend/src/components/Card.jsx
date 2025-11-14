import React, { useContext } from "react";
import { userDataContext } from "../Context/userContext";

const Card = ({ image }) => {
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

  return (
    <div
      className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${
        selectedImage === image
          ? "border-4 border-white shadow-2xl shadow-blue-950"
          : ""
      }`}
      onClick={() => {
        setSelectedImage(image);
        setBackEndImage(null);
        setFrontEndImage(null);
      }}
    >
      <img src={image} className="h-full object-cover" />
    </div>
  );
};

export default Card;
