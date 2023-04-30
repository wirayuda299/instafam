import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { Playfair_Display } from "next/font/google";
import { useDrawerStore, useNotificationDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
});

export default function NavHeader() {
  const { drawer } = useStore(useDrawerStore);
  const {notificationDrawer, setNotificationDrawer} = useStore(useNotificationDrawerStore)
  return (
    <header
      className={`hidden w-full flex-col pl-6 md:flex md:pl-2.5 ${playfair.className}`}
    >
      <Link
        href="/"
        className={`text-3xl font-semibold transition-transform lg:pt-5`}
      >
        {drawer || notificationDrawer ? (
          <AiOutlineInstagram size={35} className="animate-scaleUp" />
        ) : (
          <>
            <h1 className="hidden lg:block ">Instafams</h1>
            <span className="block lg:hidden">
              <AiOutlineInstagram className="text-4xl" />
            </span>
          </>
        )}
      </Link>
    </header>
  );
}
