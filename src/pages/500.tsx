import Head from "next/head";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>500 &#8226; Instafam</title>
      </Head>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-gray-800">500</h1>
        <h2 className="text-3xl font-bold text-gray-800">
          Internal Server Error
        </h2>
        <button onClick={() => window.location.reload()}>reload</button>
      </div>
    </>
  );
}
