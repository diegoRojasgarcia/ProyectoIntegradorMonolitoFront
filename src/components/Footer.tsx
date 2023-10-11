const Footer = () => (
  <footer className="bg-gray-800 shadow text-white ">
    <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between ">
      <span className="text-sm text-gray-200 sm:text-center dark:text-gray-200 ">
        © 2023{" "}
        <a href="#" className="hover:underline">
          Hamburguesas Caseras
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
