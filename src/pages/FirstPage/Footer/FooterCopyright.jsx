function AppFooterCopyright() {
  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-lg text-ternary-dark dark:text-gray-300">
        &copy; {new Date().getFullYear()}
        All Right Reserved.
        <a
          href="#"
          target="__blank"
          className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 ml-1 duration-500 text-primary-dark dark:text-gray-300"
        >
          Yekassa Contractor Management System
        </a>
        .
        {/* <a
          href="#"
          target="__blank"
          className="text-secondary-dark dark:text-gray-300 font-medium uppercase hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 ml-1 duration-500"
        >
          Yekassa
        </a> */}
      </div>
    </div>
  );
}

export default AppFooterCopyright;
