// import React, { useContext, useEffect } from "react";
// import { userDataContext } from "../Context/userContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//   const { userData, serverURL, setUserData, getGeminiResponse } =
//     useContext(userDataContext);
//   const navigate = useNavigate();

//   const handleLogOut = async () => {
//     try {
//       const result = await axios.get(`${serverURL}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       navigate("/login");
//     } catch (error) {
//       setUserData(null);
//       console.log(error);
//     }
//   };

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   // const speak = (text) => {
//   //   if (!text) {
//   //     console.warn("No text to speak");
//   //     return;
//   //   }
//   //   console.log("Speaking:", text);
//   //   const utterance = new SpeechSynthesisUtterance(text);
//   //   utterance.lang = "en-US"; // optional: set language
//   //   window.speechSynthesis.cancel(); // cancel ongoing speech to avoid overlap
//   //   window.speechSynthesis.speak(utterance);
//   // };

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognitionInstance = new SpeechRecognition();
//     recognitionInstance.continuous = true;
//     recognitionInstance.lang = "en-US";
//     recognitionInstance.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       console.log("heard :" + transcript);

//       if (
//         transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
//       ) {
//         const data = await getGeminiResponse(transcript);
//         console.log(data);
//         speak(data.response);
//       }
//     };
//     recognitionInstance.start();
//   }, []);

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[20px]">
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer"
//         onClick={() => navigate("/customize")}
//       >
//         Customize your Assistant
//       </button>
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[20px] right-[20px] cursor-pointer"
//         onClick={handleLogOut}
//       >
//         logout
//       </button>
//       <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
//         <img src={userData?.assistantImage} className="h-full object-cover" />
//       </div>
//       <h1 className="text-white text-[18px] font-bold">
//         I'm {userData?.assistantName}
//       </h1>
//     </div>
//   );
// };

// export default Home;

// import React, { useContext, useState } from "react";
// import { userDataContext } from "../Context/userContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useRef } from "react";

// const Home = () => {
//   const { userData, serverURL, setUserData, getGeminiResponse } =
//     useContext(userDataContext);
//   const navigate = useNavigate();

//   const [recognition, setRecognition] = useState(null);
//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;
//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverURL}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       navigate("/login");
//     } catch (error) {
//       setUserData(null);
//       console.log(error);
//     }
//   };

//   const speak = (text) => {
//     if (!text) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
//   };

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }
//     const recognitionInstance = new SpeechRecognition();
//     recognitionInstance.continuous = true; // fixed typo here
//     recognitionInstance.lang = "en-US";
//     recognitionRef.current = recognitionInstance;
//     const isRecognizingRef = { current: false };
//     recognitionInstance.onresult = async (event) => {
//       const transcript =
//         event.results[event.results.length - 1][0].transcript.trim();
//       console.log("Heard:", transcript);

//       if (
//         transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
//       ) {
//         const data = await getGeminiResponse(transcript);
//         console.log("Response:", data);
//         speak(data.response);
//         handleCommand(data);
//       }
//     };
//     recognitionInstance.start();
//     setRecognition(recognitionInstance);
//     console.log("Speech recognition started");
//   };

//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     speak(response);

//     if (type === "google-search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//     if (type === "calculator-open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     }
//     if (type === "instagram-open") {
//       window.open(`https://www.instagram.com/`, "_blank");
//     }
//     if (type === "facebook-open") {
//       window.open(`https://www.facebook.com/`, "_blank");
//     }
//     if (type === "weather-show") {
//       window.open(`https://www.google.com/search?q=weather`, "_blank");
//     }

//     if (type === "youtube-search" || type === "youtube-play") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank"
//       );
//     }
//   };
//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[20px]">
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer"
//         onClick={() => navigate("/customize")}
//       >
//         Customize your Assistant
//       </button>
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[20px] right-[20px] cursor-pointer"
//         onClick={handleLogOut}
//       >
//         logout
//       </button>

//       {/* Add this button to start voice recognition on user click */}
//       {!recognition && (
//         <button
//           onClick={startListening}
//           className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold mt-6"
//         >
//           Start Listening
//         </button>
//       )}

//       <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg mt-4">
//         <img src={userData?.assistantImage} className="h-full object-cover" />
//       </div>
//       <h1 className="text-white text-[18px] font-bold mt-2">
//         I'm {userData?.assistantName}
//       </h1>
//     </div>
//   );
// };

// export default Home;

// import React, { useContext, useState } from "react";
// import { userDataContext } from "../Context/userContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useRef } from "react";

// const Home = () => {
//   const { userData, serverURL, setUserData, getGeminiResponse } =
//     useContext(userDataContext);
//   const navigate = useNavigate();

//   const [recognition, setRecognition] = useState(null);
//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;
//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverURL}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       navigate("/login");
//     } catch (error) {
//       setUserData(null);
//       console.log(error);
//     }
//   };

//   const speak = (text) => {
//     if (!text) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
//   };

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }
//     const recognitionInstance = new SpeechRecognition();
//     recognitionInstance.continuous = true; // fixed typo here
//     recognitionInstance.lang = "en-US";
//     recognitionRef.current = recognitionInstance;
//     const isRecognizingRef = { current: false };

//     const safeReconition = () => {
//       if (!isSpeakingRef && !isRecognizingRef) {
//         try {
//           recognitionInstance.start();
//           console.log("Reconition requested to start");
//         } catch (error) {
//           if (error.name !== "invalidStateError") {
//             console.log("start err :", error);
//           }
//         }
//       }
//     };
//     recognitionInstance.onresult = async (event) => {
//       const transcript =
//         event.results[event.results.length - 1][0].transcript.trim();
//       console.log("Heard:", transcript);

//       if (
//         transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
//       ) {
//         const data = await getGeminiResponse(transcript);
//         console.log("Response:", data);
//         speak(data.response);
//         handleCommand(data);
//       }
//     };
//     // recognitionInstance.start();
//     setRecognition(recognitionInstance);
//     console.log("Speech recognition started");
//   };

//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     speak(response);

//     if (type === "google-search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//     if (type === "calculator-open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     }
//     if (type === "instagram-open") {
//       window.open(`https://www.instagram.com/`, "_blank");
//     }
//     if (type === "facebook-open") {
//       window.open(`https://www.facebook.com/`, "_blank");
//     }
//     if (type === "weather-show") {
//       window.open(`https://www.google.com/search?q=weather`, "_blank");
//     }

//     if (type === "youtube-search" || type === "youtube-play") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank"
//       );
//     }
//   };
//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[20px]">
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer"
//         onClick={() => navigate("/customize")}
//       >
//         Customize your Assistant
//       </button>
//       <button
//         className="min-w-[150px] mt-[30px] h-[60px] bg-blue-300 rounded-full font-semibold text-[20px] absolute top-[20px] right-[20px] cursor-pointer"
//         onClick={handleLogOut}
//       >
//         logout
//       </button>

//       {/* Add this button to start voice recognition on user click */}
//       {!recognition && (
//         <button
//           onClick={startListening}
//           className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold mt-6"
//         >
//           Start Listening
//         </button>
//       )}

//       <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg mt-4">
//         <img src={userData?.assistantImage} className="h-full object-cover" />
//       </div>
//       <h1 className="text-white text-[18px] font-bold mt-2">
//         I'm {userData?.assistantName}
//       </h1>
//     </div>
//   );
// };

// export default Home;

import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import userImg from "../assets/ai.gif";
function Home() {
  const { userData, serverURL, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const [ham, setHam] = useState(false);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
        console.log("Recognition requested to start");
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Start error:", error);
        }
      }
    }
  };

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);
    utterence.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current = true;
    utterence.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition(); // ⏳ Delay se race condition avoid hoti hai
      }, 800);
    };
    synth.cancel(); // 🛑 pehle se koi speech ho to band karo
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google-search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    if (type === "calculator-open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }
    if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, "_blank");
    }
    if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, "_blank");
    }
    if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube-search" || type === "youtube-play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    let isMounted = true; // flag to avoid setState on unmounted component

    // Start recognition after 1 second delay only if component still mounted
    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.error(e);
          }
        }
      }
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted");
            } catch (e) {
              if (e.name !== "InvalidStateError") console.error(e);
            }
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted after error");
            } catch (e) {
              if (e.name !== "InvalidStateError") console.error(e);
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    const greeting = new SpeechSynthesisUtterance(
      `Hello ${userData.userName}, what can I help you with?`
    );
    greeting.lang = "hi-IN";

    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px] overflow-hidden">
      <CgMenuRight
        className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
        onClick={() => setHam(true)}
      />
      <div
        className={`absolute lg:hidden top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${
          ham ? "translate-x-0" : "translate-x-full"
        } transition-transform`}
      >
        <RxCross1
          className=" text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
          onClick={() => setHam(false)}
        />
        <button
          className="min-w-[150px] h-[60px]  text-black font-semibold   bg-white rounded-full cursor-pointer text-[19px] "
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className="min-w-[150px] h-[60px]  text-black font-semibold  bg-white  rounded-full cursor-pointer text-[19px] px-[20px] py-[10px] "
          onClick={() => navigate("/customize")}
        >
          Customize your Assistant
        </button>

        <div className="w-full h-[2px] bg-gray-400"></div>
        <h1 className="text-white font-semibold text-[19px]">History</h1>

        <div className="w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col truncate">
          {userData.history?.map((his) => (
            <div className="text-gray-200 text-[18px] w-full h-[30px]  ">
              {his}
            </div>
          ))}
        </div>
      </div>
      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute hidden lg:block top-[20px] right-[20px]  bg-white rounded-full cursor-pointer text-[19px] "
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white absolute top-[100px] right-[20px] rounded-full cursor-pointer text-[19px] px-[20px] py-[10px] hidden lg:block "
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-[18px] font-semibold">
        I'm {userData?.assistantName}
      </h1>
      {!aiText && <img src={userImg} alt="" className="w-[200px]" />}
      {aiText && <img src={aiImg} alt="" className="w-[200px]" />}

      <h1 className="text-white text-[18px] font-semibold text-wrap">
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
}

export default Home;
