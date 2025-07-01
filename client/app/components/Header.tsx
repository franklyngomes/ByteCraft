"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/store/store";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { ProfileQuery } from "@/api/query/query";
import SignoutFunc from "@/api/functions/SignoutApiFunc";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cookies = new Cookies();
  const token = useStore((state: any) => state.token);
  const updateToken = useStore((state: any) => state.updateToken);
  const user = useStore((state: any) => state.user);
  const updateUser = useStore((state: any) => state.updateUser);
  const id = user?._id;
  const { data } = ProfileQuery(id);
  const router = useRouter();

  useEffect(() => {
    const x_access_token = cookies.get("token");
    if (x_access_token) {
      const decoded = jwtDecode(x_access_token);
      updateUser(decoded);
      if (token !== x_access_token) {
        updateToken(x_access_token);
      }
    }
  }, [token]);

  const logout = () => {
    SignoutFunc();
    updateToken("");
    router.push("/signin");
  };

  return (
    <header id="header" className="fixed-top bg-white shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link href="/" className="logo">
          <Image
            src="/assets/img/logo-png.png"
            alt="Logo"
            className="img-fluid"
            width={65}
            height={65}
          />
        </Link>


        {/* Desktop Menu */}
        <nav className="nav-menu d-none d-lg-block">
          <ul className="d-flex gap-4 align-items-center m-0">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {!token && (
              <li>
                <div className="header-social-links ">
                  <div className="header-btn">
                    <a href="/signin" className="">
                      Signin
                    </a>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
        {/* Hamburger Toggle (only visible on mobile) */}
        <button
          className="d-lg-none border-0 bg-transparent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars fa-lg"></i>
          </span>
        </button>

        {/* Profile Dropdown (always visible on large) */}
        {token && data && (
          <div className="nav-item dropdown no-arrow d-none d-lg-block">
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
                {data.name}
              </span>
              <img
                className="img-profile rounded-circle"
                src={`${data?.image
                  ? `http://localhost:5000/${data.image}`
                  : "/assets/img/comments-6.jpg"
                  }`}
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              {/* <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a> */}
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="mobile-menu d-lg-none bg-white p-3" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><Link href="/" className="text-decoration-none text-muted" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li className="mb-2"><Link href="/portfolio" className="text-decoration-none text-muted" onClick={() => setIsMenuOpen(false)}>Portfolio</Link></li>
            <li className="mb-2"><Link href="/courses" className="text-decoration-none text-muted" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
            <li className="mb-2"><Link href="/blog" className="text-decoration-none text-muted" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            <li className="mb-2"><Link href="/contact" className="text-decoration-none text-muted" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            {!token && (
              <li className="mb-2">
                <Link href="/signin" className="btn btn-sm btn-success w-100" onClick={() => setIsMenuOpen(false)}>
                  Signin
                </Link>
              </li>
            )}
            {token && data && (
              <>
                <li className="border-top pt-2 mt-2 text-muted small">{data.name}</li>
                <li><button className="btn btn-link text-start w-100 px-0" onClick={logout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
