import React from "react";
import Marquee from "react-fast-marquee";

import config from "../data/config.json";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Banner = () => {
  return (
    <div className="py-16">
      <Marquee autoFill>
        <h1 className="text-9xl uppercase font-bold mx-8">
          {config.businessName}
        </h1>
      </Marquee>
    </div>
  );
};

export default Banner;
