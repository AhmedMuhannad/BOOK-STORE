import React from "react";
import harryPotter from "../../harryPotter.png";
import science from "../../science.png";
const ZShaped = () => {
  return (
    <>
      <h1 className="font-bebas text-4xl md:text-5xl text-center p-4 py-6">
        EXPLORE THE WORLD OF BOOKS
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 font-bebas text-xl md:text-2xl lg:text-3xl p-4">
        {/* 1 - Fiction */}
        <div className="flex justify-center items-center order-1">
          <div>
            <span className="block py-4 text-gray-400 text-6xl md:text-8xl">
              1
            </span>
            <h1>
              Step into worlds of magic, mystery, and adventure. Fiction novels
              transport you to places where imagination knows no limits and
              every page invites you to dream.
            </h1>
          </div>
        </div>
        <div className="order-2">
          <img
            src={harryPotter}
            alt="Fiction"
            className="w-[90%] sm:w-[60%] md:w-[65%] lg:w-[60%] xl:w-[50%] mx-auto"
          />
        </div>

        {/* 2 - Literature */}
        <div className="order-4 lg:order-3">
          <img
            src={science}
            alt="Literature"
            className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[50%] mx-auto"
          />
        </div>
        <div className="flex justify-center items-center order-3 lg:order-4">
          <div>
            <span className="block py-4 text-gray-400 text-6xl md:text-8xl">
              2
            </span>
            <h1>
              Timeless stories, powerful words. Literature captures the beauty
              of language and the depth of human experience, offering you
              classics and modern works that inspire reflection.
            </h1>
          </div>
        </div>

        {/* 3 - Science */}
        <div className="flex justify-center items-center order-5">
          <div>
            <span className="block py-4 text-gray-400 text-6xl md:text-8xl">
              3
            </span>
            <h1>
              Explore, discover, understand. Science books open doors to
              knowledge, from the wonders of the universe to the marvels of
              everyday life, sparking curiosity at every turn.
            </h1>
          </div>
        </div>
        <div className="order-6">
          <img
            src={harryPotter}
            alt="Science"
            className="w-[90%] sm:w-[60%] md:w-[65%] lg:w-[60%] xl:w-[50%] mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default ZShaped;
