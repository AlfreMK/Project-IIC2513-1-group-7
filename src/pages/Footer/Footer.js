import React from "react";

const Footer = (props) => {
    const url = "https://github.com/AlfreMK/Project-IIC2513-1-group-7"
    const classProps = props.className;
    return (
      <footer className={`p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-blue-400 w-full ${classProps} `}>
    <span className="text-sm text-white sm:text-center ">© 2022 <a href={url} className="hover:underline">Almuerzos UC™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-white  sm:mt-0">
        <li>
            <a href={url} className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href={url} className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href={url} className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href={url} className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
    )
  };


  export default Footer;