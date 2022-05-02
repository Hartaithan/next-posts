import Link from "next/link";
import React from "react";
import Container from "./Container";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <Container>
        <div className="relative flex items-center justify-end h-16">
          <Link href="https://hartaithan.github.io/">
            <a className="text-white" target="_blank" rel="noopener noreferrer">
              Hartathan.
            </a>
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
