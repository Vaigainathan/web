import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import child from "../assets/kid-pic.png";
import grandpa from "../assets/grandpa.png";

const dialogs = [
  {
    oldMan: "Hamare pados mein ek aadmi tha, badi gaadi chalata tha. Stock market mein ghusa aur ab auto chala raha hai.",
  },
  {
    oldMan: "Ameer banne ke sapne dekhte dekhte log gareeb ban jaate hain stock market mein.",
  },
  {
    oldMan: "Mujhe ek aadmi pata hai, apne bete ki shaadi ke liye paisa jama kiya tha, sab stock market mein laga diya aur sab barbaad ho gaya.",
  },
  {
    oldMan: "Beta, tumhare tauji ke dost ka ladka MBA kiya tha, socha stock market se crore kama lega. Aaj colony ka cable ka connection repair karta hai.",
  },
  {
    oldMan: "Hamare zamane mein FD aur PPF mein paisa lagta tha, aur log shanti se raat ko so lete the. Yeh stock market walon ki neend toh hamesha udhi rehti hai.",
  },
  {
    oldMan: "Arre bhai, yeh share market toh ek loteri hai. Jitne paise tum kharche ho, utne paise toh meri patni bachat karke 15 saal mein kama leti hai!",
  },
];

export const SmoothScrollHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastScrollTop = useRef(0);

  const updateDialog = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dialogs.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (Math.abs(scrollTop - lastScrollTop.current) > 100) {
        updateDialog();
        lastScrollTop.current = scrollTop;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#002F49] text-[#D1D0CB] min-h-screen">
      <div className="flex flex-col items-center justify-start min-h-[300vh] px-4 text-center pt-32">
        <div className="sticky top-32 flex flex-row items-center justify-between w-full max-w-6xl gap-32 relative">
          {/* Boy Section */}
          <CompactImage
            src={child}
            alt="Boy"
            title="Grand-child"
            customStyles="w-[300px] h-[410px]"
          />

          {/* Dialog Box */}
          <motion.div
            className="absolute text-left h-fit  top-1/4 left-1/2 transform -translate-x-1/4 -translate-y-1/1 bg-[#FEF0D5] text-[#002F49] text-bold rounded-full p-4 shadow-lg w-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center">{dialogs[currentIndex].oldMan}</p>
          </motion.div>

          {/* Old Man Section */}
          <CompactImage
            src={grandpa}
            alt="Old Man"
            title="Grand-father"
            customStyles="w-[400px] h-[410px]"
          />
        </div>
      </div>
    </div>
  );
};

const CompactImage = ({ src, alt, title, customStyles }) => {
  const ref = useRef(null);

  return (
    <div className="text-center max-w-sm flex flex-col items-center justify-start">
      <motion.img
        src={src}
        alt={alt}
        ref={ref}
        className={`rounded-full ${customStyles}`} // Custom styles for size
      />
      <h2 className="text-2xl mb-6 font-semibold text-[#FEF0D5] mt-4">{title}</h2>
    </div>
  );
};