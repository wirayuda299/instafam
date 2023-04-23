import { AiOutlineSearch } from "react-icons/ai";
import { memo, useEffect } from "react";
import { useDarkModeStore, useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import Buttons from "../Buttons/Buttons";
const Form = dynamic(() => import("./Form"), { ssr: false });

function SearchDrawer() {
  const { drawer, setDrawer } = useStore(useDrawerStore);
  const { darkMode } = useStore(useDarkModeStore);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDrawer(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setDrawer(false);
      });
    };
  }, []);

  return (
    <>
      {drawer ? (
        <section
          className={`fixed z-50  transition-all duration-300 ease-out ${
            darkMode ? "bg-black" : "bg-white"
          } ${
            drawer
              ? "animate-slideIn lg:animate-slideIn"
              : "animate-slideOut lg:animate-slideOutWidth"
          }`}
        >
          <div className=" h-full w-full ">
            <div className="w-64 border-b p-5">
              <h1 className="py-5 text-2xl font-semibold">Search</h1>
              <Form height="h-screen ">
                <Buttons type="submit" name="search" title="search">
                  <AiOutlineSearch size={20} />
                </Buttons>
              </Form>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
export default memo(SearchDrawer);
