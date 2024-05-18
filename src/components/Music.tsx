import React, { useEffect, useState } from "react";
import type { SVGProps } from "react";

import { Icon } from "@iconify-icon/react";

import melowdownz from "../assets/music/melowdownz.mp3";

export function SvgSpinnersBarsScaleMiddle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width={2.8} height={12} x={1} y={6} fill="currentColor"></rect>
      <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor"></rect>
      <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor"></rect>
      <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor"></rect>
      <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor"></rect>
    </svg>
  );
}

const SvgSpinnersBarsScaleMiddlePlaying = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor">
        <animate
          id="svgSpinnersBarsScaleMiddle0"
          attributeName="y"
          begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor">
        <animate
          id="svgSpinnersBarsScaleMiddle1"
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
    </svg>
  );
};

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [audio] = useState(new Audio(melowdownz));
  audio.loop = true;

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleOnClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div onClick={handleOnClick} className="rounded-xl bg-slate-200">
      {isPlaying ? (
        <SvgSpinnersBarsScaleMiddlePlaying className="text-2xl p-2 w-12" />
      ) : (
        <SvgSpinnersBarsScaleMiddle className="text-2xl p-2 w-12" />
      )}
    </div>
  );
};

export default Music;
