import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-end h-16">
          <Link href="https://hartaithan.github.io/">
            <a className="text-white" target="_blank" rel="noopener noreferrer">
              Hartathan.
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
