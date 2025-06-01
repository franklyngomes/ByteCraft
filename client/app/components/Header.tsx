"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/store/store";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { ProfileQuery } from "@/api/query/query";
const Header = () => {
  const cookies = new Cookies();
  const token = useStore((state: any) => state.token);
  const updateToken = useStore((state: any) => state.updateToken);
  const user = useStore((state: any) => state.user);
  const updateUser = useStore((state: any) => state.updateUser);
  const id = user?._id;
  const { data } = ProfileQuery(id);
  React.useEffect(() => {
    if (cookies.get("x-access-token")) {
      const x_access_token = cookies.get("x-access-token");
      const decoded = jwtDecode(x_access_token);
      updateUser(decoded);
      if (x_access_token && token !== x_access_token) {
        updateToken(x_access_token);
      }
    }
  }, [token]);
  const logout = () => {
    if (cookies.get("x-access-token")) {
      cookies.remove("x-access-token");
      updateToken("");
    }
  };
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
        {!token && (
          <div className="header-social-links ">
            <div className="header-btn">
              <a href="/signin" className="">
                Signin
              </a>
            </div>
          </div>
        )}
        {/* User Avatar Section */}
        {token && data && (
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
                  {data.name}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src={`${
                    data?.image
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
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
