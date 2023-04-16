import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineInstagram } from "react-icons/ai";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
interface Providers {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignIn({ providers }: { providers: Providers }) {
  return (
    <>
      <Head>
        <title>Sign In &#8226; Instafam</title>
        <meta name="description" content="Sign in to your Instafam account" />
        <meta name="keywords" content="instagram, sign in, login" />
        <meta
          property="og:url"
          content="https://instafam.vercel.app/auth/signin"
        />
        <meta name="X-content-type-options" content="nosniff" />
        <meta name="X-frame-options" content="DENY" />
        <meta name="X-xss-protection" content="1; mode=block" />
        <meta name="referrer" content="no-referrer" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
      </Head>
      <div className="grid h-screen w-full place-items-center p-5 text-black dark:text-white">
        <div className="flex aspect-square max-h-[512px] max-w-lg flex-col items-center justify-center text-center">
          <div className="text-9xl  ">
            <svg width="1em" height="1em">
              <linearGradient
                id="blue-gradient"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop stopColor="#db2777" offset="0%" />
                <stop stopColor="#fb923c" offset="100%" />
              </linearGradient>
              <AiOutlineInstagram style={{ fill: "url(#blue-gradient)" }} />
            </svg>
          </div>
          <h1 className=" bg-gradient-to-r from-pink-600 from-50% to-orange-400 bg-clip-text text-3xl font-bold text-transparent  sm:text-4xl md:text-5xl ">
            Welcome Back to Instafam
          </h1>
          <p className=" pb-7 pt-4  font-semibold text-black dark:text-white md:text-lg ">
            Share your experiences, connect with your friends and family, and
            discover new things on Instafam.
          </p>
          {Object.values(providers).map((provider) => (
            <button
              type="button"
              name="sign in with google"
              title="Sign in with Google"
              key={provider.id}
              className="ease inline-flex items-center gap-x-5 rounded-md bg-black bg-gradient-to-r  from-pink-600 from-30% to-orange-400 px-5 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-opacity-80 dark:bg-white"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${process.env.NEXTAUTH_URL}`,
                  redirect: true,
                })
              }
            >
              Sign in with {provider.name}
              <span>
                <FcGoogle size={25} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { getProviders, getSession } = await import("next-auth/react");
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
