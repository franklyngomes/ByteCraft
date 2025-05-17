"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <Link href="/" className="logo mr-auto">
          <Image
            src="/assets/img/logo-png.png"
            alt="Logo"
            className="img-fluid"
            width={65}
            height={65}
          />
        </Link>

        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active">
              <Link href="/">Home</Link>
            </li>

            <li className="drop-down">
              <Link href="">About</Link>
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/team">Team</Link>
                </li>
                <li>
                  <Link href="/testimonials">Testimonials</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="header-social-links">
          <Link href="/" className="twitter">
            <i className="icofont icofont-twitter"></i>
          </Link>
          <Link href="/" className="facebook">
            <i className="icofont icofont-facebook"></i>
          </Link>
          <Link href="/" className="instagram">
            <i className="icofont icofont-instagram"></i>
          </Link>
          <Link href="/" className="linkedin">
            <i className="icofont icofont-linkedin"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
