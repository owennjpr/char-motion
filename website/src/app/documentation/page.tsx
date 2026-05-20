"use client";
import LinkButton from "@/components/LinkButton";
import RefreshButton from "@/components/RefreshButton";
import { Txt } from "@char-motion/react";
import Link from "next/link";
import React, { useState } from "react";

function Documentation() {
  const [refresh1, setRefresh1] = useState<number>(0);
  const [refresh2, setRefresh2] = useState<number>(0);
  const [refresh3, setRefresh3] = useState<number>(0);
  const [refresh4, setRefresh4] = useState<number>(0);

  return (
    <div className="w-full flex flex-col items-center font-cutive">
      <div className="pt-4">
        <LinkButton path="/">
          <Txt enter={{ type: "typed sweep" }} className="text-lg">
            {"[ back ]"}
          </Txt>
        </LinkButton>
      </div>
      <div className="w-full flex flex-col items-center py-8 gap-4">
        <Txt
          enter={{
            type: "randomized",
            options: { duration: 1000 },
          }}
          hover={{
            type: "twinkle",
            options: {
              rate: 50,
              maxNum: 5,
              characterPool: "*^",
            },
          }}
          className="text-[8px]/2 sm:text-sm/3.5 w-[330px] sm:w-[630px] h-[84px] whitespace-pre-wrap tracking-tighter text-center"
        >{`  _____                                        _        _   _             
 |  __ \\                                      | |      | | (_)            
 | |  | | ___   ___ _   _ _ __ ___   ___ _ __ | |_ __ _| |_ _  ___  _ __  
 | |  | |/ _ \\ / __| | | | '_ ${"`"} _ \\ / _ \\ '_ \\| __/ _ ${"`"}| __| |/ _ \\| '_ \\ 
 | |__| | (_) | (__| |_| | | | | | |  __/ | | | || (_| | |_| | (_) | | | |
 |_____/ \\___/ \\___|\\__,_|_| |_| |_|\\___|_| |_|\\__\\__,_|\\__|_|\\___/|_| |_|`}</Txt>
        <div className="w-5/6 max-w-[750px] mt-4">
          <div>
            <Txt className="text-2xl">Installation</Txt>
            <p className="bg-[#0003] p-4 text-base">npm i @char-motion/react</p>
          </div>
          <div className="flex flex-col gap-2">
            <Txt className="text-2xl">Usage</Txt>
            <p className="text-base">
              import the Txt component and use it declaratively in your JSX/TSX
              components, passing in a string as a child.{" "}
              <span className="text-xs">no spans yet sorry :(</span>
            </p>
            <p className="bg-[#0003] p-4 text-base whitespace-pre-wrap overflow-x-scroll">
              {`import { Txt } from "@char-motion/react";

<Txt enter={{ type: "typed sweep" }}>
  Hello World!
</Txt>`}
            </p>
            <div className="flex flex-row justify-between bg-[#0003] p-4 ">
              <Txt
                key={refresh1}
                className="text-base"
                enter={{ type: "typed sweep" }}
              >
                Hello World!
              </Txt>
              <RefreshButton
                refresh={refresh1}
                setRefresh={setRefresh1}
                className="translate-y-1"
              />
            </div>
            <p className="text-base pt-4">
              {"<Txt>"} is a wrapper around the {"<p>"} tag. This means that any
              parameters you could add to {"<p>"} can be applied to {"<Txt>"}.
            </p>
            <p className="bg-[#0003] p-4 text-base whitespace-pre-wrap overflow-x-scroll">
              {`<Txt 
  enter={{ type: "typed sweep" }} 
  style={{ color: "#0F0", borderBottom: "blue solid 2px" }}
>
  Hello World But Green!
</Txt>`}
            </p>
            <div className="flex flex-row justify-between bg-[#0003] p-4 ">
              <Txt
                key={refresh2}
                className="text-base"
                enter={{ type: "typed sweep" }}
                style={{ color: "#0F0", borderBottom: "blue solid 2px" }}
              >
                Hello World But Green!
              </Txt>
              <RefreshButton
                refresh={refresh2}
                setRefresh={setRefresh2}
                className="translate-y-1"
              />
            </div>
            <p className="text-base pt-4">
              For more customization over each effect use the
              {' "'}options{'"'} prop. Different effects have different sets of
              options, which you can explore in the{" "}
              <Link href="/gallery" className="text-blue-500">
                gallery
              </Link>
              .
            </p>
            <p className="bg-[#0003] p-4 text-base whitespace-pre-wrap overflow-x-scroll">
              {`<Txt
  enter={{
    type: "randomized",
    options: { duration: 2000, easing: "easeOut", characterPool: "^*~${"`"}" },
  }}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua.
</Txt>`}
            </p>
            <div className="flex flex-row justify-between bg-[#0003] p-4 ">
              <Txt
                key={refresh3}
                className="text-base"
                enter={{
                  type: "randomized",
                  options: {
                    duration: 2000,
                    easing: "easeOut",
                    characterPool: "^*~`",
                  },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Txt>
              <RefreshButton
                refresh={refresh3}
                setRefresh={setRefresh3}
                className="translate-y-1"
              />
            </div>
            <p className="text-base pt-4">
              You can apply multiple different categories of effects on the same
              Txt component, for example having both a hover and an enter
              effect.
            </p>
            <p className="bg-[#0003] p-4 text-base whitespace-pre-wrap overflow-x-scroll">
              {`<Txt
  enter={{
    type: "typed sweep",
    options: { rate: 20, cursor: "█" },
  }}
  hover={{
    type: "cursor sweep",
    options: { rate: 20, idleRate: 300, cursor: "█" },
  }}
>
  This text enters and hovers!
</Txt>`}
            </p>
            <div className="flex flex-row justify-between bg-[#0003] p-4 ">
              <Txt
                key={refresh4}
                className="text-base"
                enter={{
                  type: "typed sweep",
                  options: { rate: 20, cursor: "█" },
                }}
                hover={{
                  type: "typed sweep",
                  options: { rate: 20, idleRate: 300, cursor: "█" },
                }}
                morph={{ type: "retype" }}
              >
                This text enters and hovers!
              </Txt>
              <RefreshButton
                refresh={refresh4}
                setRefresh={setRefresh4}
                className="translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
