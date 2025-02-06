// components/Sidebar.js
import React from "react";
import { Button } from "@heroui/react";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Sidebar({ isLogin, data }) {
  console.log(data);

  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar w-[80vw] md:w-[30vw] bg-gray-100 p-5 z-[10000] h-full pt-10 flex flex-col justify-around">
        <h2 className="text-2xl font-bold">DeepWave AI</h2>
        {isLogin ? (
          <div>
            <div className="mb-6">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                + New Chat
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recent</h3>
              <ul className="space-y-2 h-[60vh] overflow-auto">
                {/* <li className="cursor-pointer hover:bg-gray-200 p-2 rounded overflow-auto">
                  What is React?
                </li> */}
              </ul>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/settings");
              }}
            >
              <Button
                type="submit"
                className=" flex justify-around items-center  rounded-4xl bg-blue-300 p-4"
                variant="outlined"
                color="success"
              >
                <div>
                  {" "}
                  <h3 className=" ">{data.userName}</h3>
                </div>
                <div className="text-2xl">
                  <IoMdSettings />
                </div>
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              <Button
                type="submit"
                className="w-full dark:bg-neutral-950 p-6 rounded-2xl text-white"
              >
                Login
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
