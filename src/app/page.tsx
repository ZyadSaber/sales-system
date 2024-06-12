import { memo } from "react";
import Image from 'next/image';
import InputText from "@/components/input-text"
import Button from "@/components/button"

const SignInPage = () => {
  return (
    <div className="h-screen flex">
      <div className="w-2/6 h-full bg-white flex justify-center items-center">
        <Image
          src="/logo.jpeg"
          alt="Dummy Image"
          width={400}
          height={350}
          className="rounded-3xl shadow-lg"
        />
      </div>
      <div className="w-4/6 h-full bg-gray-300 justify-center items-center flex">
        <div className="px-10 bg-white rounded-3xl h-4/6 w-3/6 flex flex-col items-center justify-center gap-7 shadow-xl">
          <h1 className="font-semibold text-5xl mb-10">Click Sale</h1>
          <h1 className="font-base text-2xl">Log In</h1>
          <InputText label="User Name" name="user_name" width="300px" />
          <InputText label="Password" name="password" width="300px" type="password" />
          <Button label="Sign In" />
          <p className="mt-16">version 0.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default memo(SignInPage)