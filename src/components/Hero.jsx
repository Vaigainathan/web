import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import child from "../assets/kid-pic.png";
import grandpa from "../assets/grandpa.png";

// List of dialogues by Grandpa (Old Man)
const dialogs = [
  {
    oldMan: "Beta , Hamare pados mein ek aadmi tha, badi gaadi chalata tha. Stock market mein ghusa aur ab auto chala raha hai.",
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

// Final line by the grandchild
const grandchildDialog =
  "Apna myth-breaking journey shuru karo! Dada ji ki baatein mazedaar hain, lekin sahi knowledge ke bina stock market ek puzzle hi rahega.";

export const SmoothScrollHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastScrollTop = useRef(0);

  // Update dialog based on scroll direction
  const updateDialog = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === "down" && prevIndex < dialogs.length) {
        return prevIndex + 1;
      } else if (direction === "up" && prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  // Smooth scroll logic with cooldown
  useEffect(() => {
    let ticking = false;
    let lastChangeTime = 0;
    const cooldown = 600; // milliseconds between scroll updates

    const handleScroll = () => {
      const now = Date.now();
      const scrollTop = window.scrollY;
      const direction = scrollTop > lastScrollTop.current ? "down" : "up";
      const distance = Math.abs(scrollTop - lastScrollTop.current);

      if (!ticking && distance > 120 && now - lastChangeTime > cooldown) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateDialog(direction);
          lastScrollTop.current = scrollTop;
          lastChangeTime = now;
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isGrandchild = currentIndex === dialogs.length;

  return (
    <div className="bg-[#002F49] text-[#D1D0CB] min-h-screen">
      <div className="flex flex-col items-center justify-start min-h-[300vh] px-4 text-center pt-32">
        <div className="sticky top-32 flex flex-row items-center justify-between w-full max-w-6xl gap-32">

          {/* Child Image */}
          <CompactImage
            src={child}
            alt="Boy"
            title="Grand-child"
            customStyles="w-[300px] h-[410px]"
          />

          {/* Dialog Box: either grandpa's or grandchild's */}
          {isGrandchild ? (
            <DialogBox
              text={grandchildDialog}
             bgColor="bg-[#FEF0D5]"
              textColor="text-[#002F49]"
              top="top-[25%]"
              left="left-[41%]"
              transform="-translate-x-1/2 -translate-y-1/1"
            />
          ) : (
            <DialogBox
              text={dialogs[currentIndex].oldMan}
              bgColor="bg-[#FEF0D5]"
              textColor="text-[#002F49]"
              top="top-[25%]"
              left="left-[53%]"
              transform="-translate-x-1/5 -translate-y-1/1"
            />
          )}

          {/* Grandpa Image */}
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

// 👤 Renders a circular image with a label
const CompactImage = ({ src, alt, title, customStyles }) => (
  <div className="text-center max-w-sm flex flex-col items-center justify-start">
    <motion.img
      src={src}
      alt={alt}
      className={`rounded-full ${customStyles}`}
    />
    <h2 className="text-2xl mb-6 font-semibold text-[#FEF0D5] mt-4">{title}</h2>
  </div>
);

// 💬 Renders the animated dialog box with fully customizable position
const DialogBox = ({
  text,
  bgColor,
  textColor,
  top = "top-1/4",
  left = "left-1/2",
  transform = "-translate-x-1/2 -translate-y-1/2",
}) => (
  <motion.div
    className={`absolute ${top} ${left} transform ${transform} ${bgColor} ${textColor} font-bold rounded-full p-4 shadow-lg w-96`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <p className="text-center">{text}</p>
  </motion.div>
);
