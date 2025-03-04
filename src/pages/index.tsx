import { AutoSaveInput } from "@components/ui/Theme/AutoSaveInput";
import ThemeSelect from "@components/ui/Theme/ThemeSelect";
import { useAtomValue } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import Chat from "../components/Chat/Chat";
import { chatUserIdAtom } from "./_app";

const Home: NextPage = () => {
  const userId = useAtomValue(chatUserIdAtom);

  const handleSubmit = async (value: string) => {
    console.log("updating prompt id", value);
    if (!value?.length) {
      return;
    }

    // send reset to server
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        Body: {
          userId: userId,
          messageText: `reset ${value}`,
        },
      }),
    });
  };

  return (
    <>
      <Head>
        <title>TupChat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen grid-cols-6">
        <div className="col-span-1 h-full border-r-[1px] bg-base-200">
          <div className="flex h-full flex-col items-center justify-between">
            <div className="px-2 pt-4">
              <div className="text-xl-4 font-semibold"> 👋 TupChat Dashboard</div>
              <div className="whitespace-normal py-2">
                <div>USER ID</div>
                {userId}
              </div>
              <div className="flex items-center space-x-1">
                <AutoSaveInput
                  onSubmit={handleSubmit}
                  onCancel={() => null}
                  placeHolder="Prompt Id"
                />
                <div
                  className="daisy-tooltip daisy-tooltip-right"
                  data-tip="Enter a Promptable PromptId from Deployments tab. https://promptable.ai"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="py-4">
              <ThemeSelect />
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="flex h-full w-full flex-col">
            <Chat />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
