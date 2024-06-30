import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;
  const [open, setOpen] = useState({});

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const toggleOpen = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
            <div key={index}>
              <div
                  className="relative mb-3 flex hover:cursor-pointer"
                  onClick={() => toggleOpen(index)}
              >
                <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                    className={`${
                        activeRoute(route.path) ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"
                    }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                  <p
                      className={`leading-1 ml-4 flex ${
                          activeRoute(route.path) ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"
                      }`}
                  >
                    {route.name}
                  </p>
                  {open[index] ? <MdExpandLess className="ml-auto" /> : <MdExpandMore className="ml-auto" />}
                </li>
              </div>
              {open[index] && (
                  <ul className="ml-8">
                    {createLinks(route.children)}
                  </ul>
              )}
            </div>
        );
      } else {
        return (
            <Link key={index} to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                    className="my-[3px] flex cursor-pointer items-center px-8"
                    key={index}
                >
                <span
                    className={`${
                        activeRoute(route.path) === true
                            ? "font-bold text-brand-500 dark:text-white"
                            : "font-medium text-gray-600"
                    }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                  <p
                      className={`leading-1 ml-4 flex ${
                          activeRoute(route.path) === true
                              ? "font-bold text-navy-700 dark:text-white"
                              : "font-medium text-gray-600"
                      }`}
                  >
                    {route.name}
                  </p>
                </li>
                {activeRoute(route.path) ? (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
