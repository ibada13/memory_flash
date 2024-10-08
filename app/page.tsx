'use client';
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-grow  flex flex-col justify-center items-center uppercase">
        <p className="text-6xl text-ds">flash</p>
        <p className="text-6xl text-dp">game</p>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center uppercase">

      <button className="uppercase  p-2 m-2 border-2 border-dp rounded-md hover:border-ds hover:text-dt transition-all duration-500 hover:scale-110 "><Link href="/classic">classic</Link></button>
      {/* <button className="uppercase  p-2 m-2 border-2 border-dp rounded-md hover:border-ds hover:text-dt transition-all duration-500 hover:scale-110 "><Link href="/crazy">crazy</Link></button> */}
      </div>
  </div>
  );
}
