import { AiOutlineSearch } from "react-icons/ai";
import { memo, useEffect } from "react";
import Form from "./Form";
import { useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";

function SearchDrawer() {
  const { drawer, setDrawer } = useStore(useDrawerStore);
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
          className={`fixed z-50 bg-white transition-all duration-300 ease-out dark:bg-black ${drawer
            ? "animate-slideIn lg:animate-slideIn"
            : "animate-slideOut lg:animate-slideOutWidth"
            }`}
        >
          <div className=" h-full w-full text-black dark:text-white">
            <div className="w-64 border-b p-5">
              <h1 className="py-5 text-2xl font-semibold">Search</h1>
              <Form height="h-screen">
                <button type="submit" name="search" title="search">
                  <AiOutlineSearch size={20} />
                </button>
              </Form>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
export default memo(SearchDrawer);
