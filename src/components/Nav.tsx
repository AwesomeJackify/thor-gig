import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";

import config from "@data/config.json";

const Nav = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="text-white">
      <nav
        id="desktopNav"
        className="navbar select-none opacity-0 absolute left-0 justify-between top-0 z-20 bg-base-100 bg-transparent max-md:hidden"
      >
        <ul className="menu menu-horizontal px-1 invisible">
          {config.pages.slice(1).map((page) => (
            <li key={page.name}>
              <a href={page.url}>{page.name}</a>
            </li>
          ))}
        </ul>
        <h1 className="text-lg">{config.businessName}</h1>
        <ul className="menu menu-horizontal px-1">
          {config.pages.slice(1).map((page) => (
            <li key={page.name}>
              <a href={page.url}>{page.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav
        id="mobileNav"
        className={`fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center bg-primary text-4xl transition-all ${
          showMobileNav ? "z-30 opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {config.pages.map((page) => (
            <a
              key={page.name}
              onClick={() => setShowMobileNav(false)}
              className="link text-white"
              href={page.url}
            >
              {page.name}
            </a>
          ))}
        </div>
      </nav>
      <Icon
        icon={`${
          showMobileNav
            ? "line-md:menu-to-close-transition"
            : "line-md:close-to-menu-transition"
        }`}
        className={`fixed bottom-2 left-1/2 z-[999] -translate-x-1/2 rounded-full bg-primary p-4 transition-all ${
          showMobileNav ? "bg-secondary text-base-100" : "bg-base-100"
        } text-4xl md:hidden`}
        onClick={() => setShowMobileNav(!showMobileNav)}
      />
    </div>
  );
};

export default Nav;
