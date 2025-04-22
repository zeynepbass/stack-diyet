import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import useStore from './useStore';
import Bell from "./bell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { search, setSearch } = useStore();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  const handleLogOut = () => {
    navigate("/giris-yap");
    localStorage.clear();
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>


          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 font-semibold text-xl flex items-center">
              <FontAwesomeIcon icon={faAppleAlt} className="text-green-500 mr-2 text-3xl" />
              <span className="text-green-500 mr-2 text-2xl"  style={{ fontFamily: "'Dancing Script', cursive" }}>Hoşgeldin {user?.result?.firstName}</span>
            </Link>
          </div>


          <div className="hidden sm:flex sm:w-[40vw]">
            <div className="relative w-full">
              <input
                type="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="default-search"
                className="w-full h-10 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-blue-500 focus:outline-none"
                placeholder="Arama..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4M14 10A7 7 0 101 10a7 7 0 0013 0z" />
                </svg>
              </div>
            </div>
          </div>


          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Bell />
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex items-center rounded-full bg-gray-100 p-2 focus:ring-2 focus:ring-white">
                      <img
                        alt="User Profile"
                        src={userProfile?.selectedFile || user?.result?.selectedFile}
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                      <button
                        className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={()=>navigate(`/profile/${user.result._id}`)}
                      >
                      Profilime git
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={handleLogOut}
                      >
                        Çıkış Yap
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <button
                className="rounded-full py-2 px-6 bg-green-500 text-white hover:bg-green-600 transition duration-300"
                onClick={() => navigate("/giris-yap")}
              >
                Giriş Yap
              </button>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
