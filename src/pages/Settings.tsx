import { useState } from "react";
import NavBar from "../components/Navbar";
import Profile from "../components/Profile";
import type { RootState } from "../store/store";
import LogOutModal from "../components/LogOutModal";

import { FaRegUserCircle } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Settings() {
  const [selectedItem, setSelectedItem] = useState(1);

  const menuList = [
    { name: "Profile", id: 1, Icon: <FaRegUserCircle /> },
    { name: "Favorite Books", id: 2, Icon: <MdFavorite /> },
    { name: "LogOut", id: 3, Icon: <IoLogInOutline /> },
    { name: "Delete Account", id: 4, Icon: <MdDelete /> },
    { name: "Admin", id: 5, Icon: <MdAdminPanelSettings /> },
  ];

  const Menu = menuList.map((item) => {
    const isSelected = item.id === selectedItem;
    const isDangerItem = item.id === 3 || item.id === 4;

    return (
      <div
        key={item.id}
        className={`flex flex-row items-center p-3 cursor-pointer transition-all duration-200 ${
          isSelected
            ? "bg-primary/10 border-r-4 border-primary text-primary"
            : "text-text/80 hover:bg-secondary/30"
        } ${isDangerItem ? "hover:bg-accent/10 hover:text-accent" : ""}`}
        onClick={() => setSelectedItem(item.id)}
      >
        <span className="mr-3 hidden md:inline">{item.Icon}</span>
        <h2 className="text-md mb-0.5">{item.name}</h2>
      </div>
    );
  });

  return (
    <div className="overflow-x-hidden h-screen w-screen">
      <NavBar />
      <div className="h-screen w-screen flex">
        <div className="w-[20%] border-r-2 border-primary/20 bg-background">
          {Menu}
        </div>
        <div className="w-[80%] h-screen bg-background p-6">
          {/* Content based on selected item */}
          {selectedItem === 1 && (
            <div className="h-full">
              <h1 className="text-2xl font-bold mb-4 text-text">
                Profile Settings
              </h1>
              <Profile />
            </div>
          )}
          {selectedItem === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-text">
                Favorite Books
              </h1>
              {/* Add favorite books content here */}
            </div>
          )}
          {selectedItem === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-text">Log Out</h1>
              <div className="h-full flex justify-center items-center">
                <LogOutModal />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
