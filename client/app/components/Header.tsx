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
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="header-social-links ">
          <div className="header-btn">
            <a href="#" className="">
              Signin
            </a>
          </div>
        </div>
      {/* User Avatar Section */}
        <div>
          <div className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                Douglas McGee
              </span>
              <img className="img-profile rounded-circle" src="/assets/img/comments-6.jpg" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
