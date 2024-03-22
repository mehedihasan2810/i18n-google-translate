import React from "react";
import LocaleSwitcher from "./locale-switcher";
import Link from "next/link";

const Navbar = ({ lang }: { lang: string }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "1200px",
        marginInline: "auto",
        paddingBlock: "1rem",
      }}
    >
      i18n
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link href={`/${lang}/blog`}>Blog</Link>
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
