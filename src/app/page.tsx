// main file of front page of the web
import HomeClient from "@/component/HomeClient";
import { getSession } from "@/lib/getsession";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();

  if (session) {
    return {
      title: "Home | BoltSync",
    };
  }

  return {
    title: "BoltSync | AI Chatbot Platform",
  };
}

export default async function Home() {
  const session = await getSession();
  console.log(session)
  return (
    <>  
    <HomeClient email={session?.user?.email!} />

    </>
  );
}
