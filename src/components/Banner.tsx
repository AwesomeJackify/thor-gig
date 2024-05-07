import React from "react";
import Marquee from "react-fast-marquee";

import config from "../data/config.json";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Banner = () => {
  return (
    <div className="bg-primary py-16">
      <Marquee autoFill className="gap-16 max-md:gap-8">
        <h1 className="text-9xl uppercase font-bold text-white">
          {config.businessName}
        </h1>
      </Marquee>
    </div>
  );
};

export default Banner;
