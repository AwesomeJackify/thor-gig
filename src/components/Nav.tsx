import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";

import config from "@data/config.json";

const Nav = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div>
      <nav
        id="desktopNav"
        className="navbar select-none absolute bottom-0 right-24 w-fit justify-between z-20 bg-base-100 bg-transparent max-md:hidden text-black font-bold"
      >
        <ul className="menu menu-horizontal px-1 gap-4">
          {config.pages.slice(1).map((page) => (
            <li key={page.name} className="hover:text-primary transition">
              <a href={page.url}>{page.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav
        id="mobileNav"
        className={`fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-primary text-4xl transition-all ${
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
        className={`fixed bottom-2 left-1/2 z-[999] text-white -translate-x-1/2 rounded-full p-4 transition-all ${
          showMobileNav ? "bg-secondary" : "bg-primary"
        } text-4xl md:hidden`}
        onClick={() => setShowMobileNav(!showMobileNav)}
      />
    </div>
  );
};

export default Nav;
