// "use client"
import Image from "next/image";
import useUsers from "@/app/hooks/useUsers";
import bcrypt from "bcryptjs";
import useExperience from "./hooks/useExperience";
import Bottombar from "./_components/Bottombar";

export default function Home() {
  // const {postUser} = useUsers();
  // const {postExperience} = useExperience();
  const experience1 = {
    email: "one@gmail.com",
    semester: "113-1",
    school: "三民國小",
    position: "校長",
    subject: "",
    role: "",
    feature: ""
  };
  const experience2 = {
    email: "two@gmail.com",
    semester: "113-1",
    school: "三民國小",
    position: "老師",
    subject: "",
    role: "",
    feature: ""
  };
  const addAdmin=async()=>{
    const pswd=await bcrypt.hash("kist", 10);
    // try {
    //   await postUser({
    //     username:"誠致",
    //     email:"chengzhi@chengzhiedu.org",
    //     phoneNumber:"",
    //     hashedPassword:pswd,
    //     // experience,
    //     authority:"A",
    //   });
    // } catch (e) {
    //   alert("user already exist");
    // }
  }
  const addTeacher=async()=>{
    const pswd1=await bcrypt.hash("0911111111", 10);
    const pswd2=await bcrypt.hash("0922222222", 10);
    // try {
    //   await postUser({
    //     username:"校一",
    //     email:"one@gmail.com",
    //     phoneNumber:"0911111111",
    //     hashedPassword:pswd1,
    //     // experience,
    //     authority:"B",
    //   });
    //   await postUser({
    //     username:"阿貳",
    //     email:"two@gmail.com",
    //     phoneNumber:"0922222222",
    //     hashedPassword:pswd2,
    //     // experience,
    //     authority:"E",
    //   });
    //   await postExperience(experience1)
    //   await postExperience(experience2)
    // }
    // catch (e){
    //   console.log(e)
    //   alert("sth went wrong (user already exist)");
    // }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* <div className="cursor-pointer text-black left-0 top-0 flex w-full justify-center border-b border-gray-300  pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200  lg:p-4 " onClick={()=>{addAdmin()}}>add admin account: chengzhi@chengzhiedu.org [pwd: kist]</div>
        <div className="cursor-pointer text-black left-0 top-0 flex w-full justify-center border-b border-gray-300  pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200  lg:p-4 " onClick={()=>{addTeacher()}}>add teacher account: one@gmail.com [pwd: 0911111111]</div> */}
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200  lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p> */}
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-balance text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      <Bottombar />
    </main>
  );
}
