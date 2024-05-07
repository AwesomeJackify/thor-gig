import React, { useEffect, useRef, useState } from "react";

import image1 from "../assets/images/hero.jpg";
import image2 from "../assets/images/facial.jpeg";
import image3 from "../assets/images/heroBG.jpeg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { Icon } from "@iconify/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin);

const Carousel = () => {
  const [isLeft, setIsLeft] = useState(false);
  const [counter, setCounter] = useState(0);

  const carouselImages = [image1.src, image2.src, image3.src];

  const [mainImage, setMainImage] = useState(carouselImages[counter]);
  const [secondImage, setSecondImage] = useState(carouselImages[counter]);

  const { contextSafe } = useGSAP();

  let wrapperRef = useRef<HTMLDivElement | null>(null);
  let cursorRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = contextSafe((e: any) => {
    if (e.target && cursorRef.current && wrapperRef.current) {
      var bounds = wrapperRef.current.getBoundingClientRect();
      let x = e.clientX - 50;
      let y = e.clientY - bounds.top - 50;

      if (e.clientX < bounds.right / 2) {
        setIsLeft(true);
        gsap.to("#cursorText", {
          duration: 0,
          text: "Prev",
        });
        gsap.to("#thorIcon", {
          duration: 0.3,
          scaleX: -1,
        });
      } else {
        setIsLeft(false);
        gsap.to("#cursorText", {
          duration: 0,
          text: "Next",
        });
        gsap.to("#thorIcon", {
          duration: 0.3,
          scaleX: 1,
        });
      }

      gsap.to(cursorRef.current, {
        duration: 0,
        x: x,
        y: y,
      });
    }
  });

  const handleMouseEnter = contextSafe(() => {
    if (cursorRef.current) {
      gsap.to(wrapperRef.current, {
        cursor: "none",
      });
      gsap.to(cursorRef.current, {
        duration: 0.3,
        scale: 1,
        opacity: 1,
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (cursorRef.current) {
      gsap.to(wrapperRef.current, {
        cursor: "auto",
      });
      gsap.to(cursorRef.current, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
      });
    }
  });

  const carouselTimeline = gsap.timeline();
  carouselTimeline.to;

  useEffect(() => {
    if (isLeft) {
      gsap.set("#mainImg", {
        left: "0",
        right: "auto",
      });
    } else {
      gsap.set("#mainImg", {
        left: "auto",
        right: "0",
      });
    }
  }, [secondImage]);

  const handleClick = contextSafe((e: any) => {
    if (isLeft) {
      setSecondImage(
        carouselImages[
          (((counter - 1) % carouselImages.length) + carouselImages.length) %
            carouselImages.length
        ]
      );
    } else {
      setSecondImage(
        carouselImages[
          (((counter + 1) % carouselImages.length) + carouselImages.length) %
            carouselImages.length
        ]
      );
    }

    gsap.to("#mainImg", {
      duration: 1,
      ease: "power2.inOut",
      width: "0%",
    });
  });

  useEffect(() => {
    gsap.set("#mainImg", {
      width: "100%",
    });
  }, [mainImage]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-[500px] overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        ref={cursorRef}
        className="w-32 scale-0 opacity-0 aspect-square relative top-0 left-0 z-50 bg-secondary rounded-full flex justify-center items-center"
      >
        <Icon
          icon="game-icons:thor-hammer"
          id="thorIcon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -z-10 -translate-y-1/2 w-[80%] h-[80%] opacity-40"
        />
        <h1 id="cursorText" className="uppercase text-white"></h1>
      </div>
      <img
        id="mainImg"
        src={mainImage}
        alt="Carousel"
        className="w-full h-full object-cover absolute top-0 left-0 z-10"
      />
      <img
        id="secondImg"
        src={secondImage}
        alt="Carousel"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
    </div>
  );
};

export default Carousel;
