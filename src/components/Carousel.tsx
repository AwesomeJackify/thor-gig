import React, { useEffect, useRef, useState } from "react";

import roofImg from "../assets/images/carousel/roof.png";
import fenceImg from "../assets/images/carousel/fence.png";
import stairsImg from "../assets/images/carousel/stairs.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { Icon } from "@iconify/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin);

const Carousel = () => {
  const [isLeft, setIsLeft] = useState(false);
  const [counter, setCounter] = useState(0);

  const carouselImages = [roofImg.src, fenceImg.src, stairsImg.src];

  const [mainImage, setMainImage] = useState(carouselImages[counter]);
  const [prevImage, setprevImage] = useState(carouselImages[counter]);

  const { contextSafe } = useGSAP();

  let wrapperRef = useRef<HTMLDivElement | null>(null);
  let cursorRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = contextSafe((e: any) => {
    if (e.target && cursorRef.current && wrapperRef.current) {
      var bounds = wrapperRef.current.getBoundingClientRect();
      let x = e.clientX - 50;
      let y = e.clientY - bounds.top - 50;

      const centerX = window.innerWidth / 2;
      const relativeX = (e.clientX - centerX) / window.innerWidth;

      if (e.clientX < bounds.right / 2) {
        setIsLeft(true);
        gsap.to("#cursorText", {
          duration: 0,
          text: "← Prev",
        });
        gsap.to("#thorIcon", {
          duration: 0.3,
          scaleX: -1,
        });
      } else {
        setIsLeft(false);
        gsap.to("#cursorText", {
          duration: 0,
          text: "Next →",
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

      gsap.to(cursorRef.current, {
        rotateZ: relativeX * 70,
        duration: 0.3,
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
      gsap.set("#prevImg", {
        left: 0,
        right: "auto",
      });
    } else {
      gsap.set("#prevImg", {
        right: 0,
        left: "auto",
      });
    }

    gsap.to("#prevImg", {
      width: "0%",
      ease: "power2.inOut",
      onComplete: () => {
        setprevImage(mainImage);
      },
    });
  }, [mainImage]);

  useEffect(() => {
    setMainImage(carouselImages[counter]);
  }, [counter]);

  const handleClick = contextSafe(() => {
    const clickTimeline = gsap.timeline();
    clickTimeline.fromTo(
      cursorRef.current,
      {
        scale: 0.8,
      },
      {
        scale: 1,
      }
    );

    gsap.set("#prevImg", {
      width: "100%",
      onComplete: () => {
        setCounter(
          (((isLeft ? counter - 1 : counter + 1) % carouselImages.length) +
            carouselImages.length) %
            carouselImages.length
        );
      },
    });
  });

  return (
    <div className="flex">
      <div
        ref={wrapperRef}
        className="w-full h-[600px] max-md:h-72 overflow-hidden relative max-md:hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          ref={cursorRef}
          className="w-32 scale-0 opacity-0 aspect-square relative top-0 left-0 z-50 bg-secondary rounded-full flex flex-col justify-center items-center"
        >
          <Icon
            icon="game-icons:thor-hammer"
            id="thorIcon"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -z-10 -translate-y-1/2 w-[80%] h-[80%] opacity-40"
          />
          <h1 id="cursorText" className="uppercase text-white select-none"></h1>
          <h1 className="text-white text-xs">
            {counter + 1} / {carouselImages.length}
          </h1>
        </div>
        <img
          id="mainImg"
          src={mainImage}
          alt="Carousel"
          className="w-full h-full object-cover absolute top-0 left-0 select-none"
        />
        <img
          id="prevImg"
          src={prevImage}
          alt="Carousel"
          className="w-full h-full object-cover absolute top-0 z-10 left-0 select-none width-0"
        />
      </div>
      <div className="carousel carousel-center w-full h-72 md:hidden">
        {carouselImages.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image} alt="Carousel" className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
