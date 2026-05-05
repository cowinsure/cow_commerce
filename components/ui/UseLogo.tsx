/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  // pass the full class on both of them not just the value
  imgWidth?: string;
  textSize?: string;
}

const UseLogo = ({ imgWidth, textSize }: LogoProps) => {
  return (
    <div>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/logo2.png"
            alt="Logo"
            className={`${imgWidth ? imgWidth : "w-9"}`}
          />
        </motion.div>
        <span
          className={`${textSize ? textSize : "text-2xl"} font-bold tracking-tighter text-emerald-400 font-serif`}
        >
          Fresh<span className="text-amber-400">Buy</span>
        </span>
      </Link>
    </div>
  );
};

export default UseLogo;
