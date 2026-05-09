"use client";
import React, { ReactNode, useState } from "react";
import { Txt } from "@char-motion/react";
import LinkButton from "@/components/LinkButton";
import RefreshButton from "@/components/RefreshButton";
import MorphButton from "@/components/MorphButton";

type OptionItem = {
  name: string;
  description: string;
  type: string;
  defaultValue: string;
};

type EffectCardProps = {
  kind: "Enter" | "Hover" | "Morph";
  name: string;
  preview: ReactNode;
  options: OptionItem[];
};

const AsciiFrame = ({ children }: { children: ReactNode }) => {
  const run = (char: string, count: number, separator = "") =>
    Array.from({ length: count }, () => char).join(separator);
  const dashRun = run("-", 200);
  const pipeRun = run("|", 200, "\n");

  return (
    <div className="w-full">
      <div className="w-full flex items-center text-xs sm:text-sm leading-none">
        <span>+</span>
        <span className="flex-1 overflow-hidden whitespace-nowrap">
          {dashRun}
        </span>
        <span>+</span>
      </div>
      <div className="relative w-full">
        <pre className="absolute left-0 top-0 h-full select-none leading-[1.2] overflow-hidden pointer-events-none">
          {pipeRun}
        </pre>
        <div className="px-3 py-3 sm:px-4 sm:py-4">{children}</div>
        <pre className="absolute right-0 top-0 h-full select-none leading-[1.2] overflow-hidden pointer-events-none">
          {pipeRun}
        </pre>
      </div>
      <div className="w-full flex items-center text-xs sm:text-sm leading-none">
        <span>+</span>
        <span className="flex-1 overflow-hidden whitespace-nowrap">
          {dashRun}
        </span>
        <span>+</span>
      </div>
    </div>
  );
};

const OptionRow = ({ option }: { option: OptionItem }) => {
  return (
    <li className="grid grid-cols-1 sm:grid-cols-[140px_1fr_140px_100px] gap-1 sm:gap-2 py-1">
      <span>{option.name}</span>
      <span>{option.description}</span>
      <span className="opacity-80">{option.type}</span>
      <span className="opacity-80">{option.defaultValue}</span>
    </li>
  );
};

const EffectCard = ({ kind, name, preview, options }: EffectCardProps) => {
  const badgeClass =
    kind === "Enter"
      ? "bg-[#0A03]"
      : kind === "Hover"
        ? "bg-[#00A3]"
        : "bg-[#A003]";

  return (
    <AsciiFrame>
      <div className="flex flex-col gap-3 sm:gap-4 text-[10px] sm:text-xs md:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-0.5 ${badgeClass}`}>{kind}</span>
          <span>{name}</span>
        </div>

        <div className="bg-[#0002] p-2 sm:p-3">{preview}</div>

        <div className="space-y-1">
          <div className="hidden sm:grid sm:grid-cols-[140px_1fr_140px_100px] sm:gap-2 opacity-80">
            <span>Name</span>
            <span>Description</span>
            <span>Type</span>
            <span>Default</span>
          </div>
          <ul>
            {options.map((option) => (
              <OptionRow key={`${name}-${option.name}`} option={option} />
            ))}
          </ul>
        </div>
      </div>
    </AsciiFrame>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <div className="pt-3">
    <p className="whitespace-pre text-sm sm:text-base">{`[ ${title} ]`}</p>
  </div>
);

function Gallery() {
  const [refresh1, setRefresh1] = useState(0);
  const [refresh2, setRefresh2] = useState(0);
  const [refresh3, setRefresh3] = useState(0);
  const [refresh4, setRefresh4] = useState(0);
  const [morph1, setMorph1] = useState(true);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <div className="w-full min-h-screen flex flex-col items-center font-cutive px-2 pb-8">
      <div className="w-full flex flex-col items-center pt-4">
        <LinkButton path="/">
          <Txt enter={{ type: "typed sweep" }} className="text-lg">
            {"[ back ]"}
          </Txt>
        </LinkButton>
      </div>

      <Txt
        enter={{ type: "randomized", options: { maxDelay: 1000 } }}
        hover={{
          type: "twinkle",
          options: { rate: 50, maxNum: 5, characterPool: "*^" },
        }}
        className="text-[9px]/2 sm:text-sm/3.5 sm:w-[555px] h-[112] whitespace-pre-wrap"
      >{`  ______  __  __          _      _____       _ _                 
 |  ____|/ _|/ _|        | |    / ____|     | | |                
 | |__  | |_| |_ ___  ___| |_  | |  __  __ _| | | ___ _ __ _   _ 
 |  __| |  _|  _/ _ \\/ __| __| | | |_ |/ _${"`"} | | |/ _ \\ '__| | | |
 | |____| | | ||  __/ (__| |_  | |__| | (_| | | |  __/ |  | |_| |
 |______|_| |_| \\___|\\___|\\__|  \\_____|\\__,_|_|_|\\___|_|   \\__, |
                                                           __/ |
                                                          |___/ `}</Txt>

      <div className="w-full sm:w-5/6 max-w-6xl flex flex-col gap-3">
        <SectionTitle title="Enter Effects" />
        <EffectCard
          kind="Enter"
          name="Typed Sweep"
          preview={
            <div className="flex flex-row justify-between gap-2 items-center">
              <Txt
                key={refresh1}
                enter={{ type: "typed sweep" }}
                className="text-left"
              >
                {lorem}
              </Txt>
              <RefreshButton refresh={refresh1} setRefresh={setRefresh1} />
            </div>
          }
          options={[
            {
              name: "rate",
              description: "time in ms for each letter to type",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "cursor",
              description: "which character to use as a cursor",
              type: "string",
              defaultValue: "_",
            },
            {
              name: "startDelay",
              description: "time in ms to wait before starting",
              type: "number",
              defaultValue: "0",
            },
            {
              name: "direction",
              description: "which side/direction the cursor starts/moves",
              type: `"ltr" | "rtl"`,
              defaultValue: `"ltr"`,
            },
          ]}
        />

        <EffectCard
          kind="Enter"
          name="Randomized"
          preview={
            <div className="flex flex-row justify-between gap-2 items-center">
              <Txt
                key={refresh2}
                enter={{ type: "randomized" }}
                className="text-left"
              >
                {lorem}
              </Txt>
              <RefreshButton refresh={refresh2} setRefresh={setRefresh2} />
            </div>
          }
          options={[
            {
              name: "maxDelay",
              description: "maximum time for the animation to resolve",
              type: "number",
              defaultValue: "1000",
            },
            {
              name: "characterPool",
              description: "which characters to use for intermediate step",
              type: "string",
              defaultValue: "-._-",
            },
            {
              name: "startDelay",
              description: "time in ms to wait before starting",
              type: "number",
              defaultValue: "0",
            },
          ]}
        />

        <EffectCard
          kind="Enter"
          name="Number Sweep"
          preview={
            <div className="flex flex-row justify-between gap-2 items-center">
              <Txt
                key={refresh3}
                enter={{ type: "number sweep" }}
                className="text-left"
              >
                100200300400500
              </Txt>
              <RefreshButton refresh={refresh3} setRefresh={setRefresh3} />
            </div>
          }
          options={[
            {
              name: "rate",
              description: "time in ms between each tick",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "cyclesPerDigit",
              description: "number of ticks for each character to be revealed",
              type: "number",
              defaultValue: "5",
            },
            {
              name: "characterPool",
              description: "available characters to shuffle through",
              type: "string",
              defaultValue: "0123456789",
            },
            {
              name: "startDelay",
              description: "time in ms to wait before starting",
              type: "number",
              defaultValue: "0",
            },
            {
              name: "direction",
              description:
                "whether numbers move right to left or left to right",
              type: `"ltr" | "rtl"`,
              defaultValue: `"rtl"`,
            },
          ]}
        />

        <EffectCard
          kind="Enter"
          name="Sort"
          preview={
            <div className="flex flex-row justify-between gap-2 items-center">
              <Txt
                key={refresh4}
                enter={{
                  type: "sort",
                  options: { direction: "ltr", rate: 30, startDelay: 150 },
                }}
                className="text-left"
              >
                Sort me into place
              </Txt>
              <RefreshButton refresh={refresh4} setRefresh={setRefresh4} />
            </div>
          }
          options={[
            {
              name: "algorithm",
              description: "sorting algorithm to use",
              type: `"cocktail shaker" | "quick sort"`,
              defaultValue: `"cocktail shaker"`,
            },
            {
              name: "rate",
              description: "time in ms between each compare/swap step",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "startDelay",
              description: "time in ms to wait before starting",
              type: "number",
              defaultValue: "0",
            },
            {
              name: "direction",
              description:
                "whether sort order is left to right or right to left",
              type: `"ltr" | "rtl"`,
              defaultValue: `"ltr"`,
            },
          ]}
        />

        <SectionTitle title="Hover Effects" />
        <EffectCard
          kind="Hover"
          name="Typed Sweep"
          preview={
            <Txt hover={{ type: "typed sweep" }} className="text-left p-2">
              {lorem}
            </Txt>
          }
          options={[
            {
              name: "rate",
              description: "time in ms between each tick",
              type: "number",
              defaultValue: "30",
            },
            {
              name: "cursor",
              description: "the character that sweeps through",
              type: "string",
              defaultValue: "_",
            },
            {
              name: "idle",
              description: "whether the cursor flickers at the end",
              type: "boolean",
              defaultValue: "true",
            },
            {
              name: "idleRate",
              description: "cursor flicker rate when idle is true",
              type: "number",
              defaultValue: "300",
            },
          ]}
        />

        <EffectCard
          kind="Hover"
          name="Shuffle"
          preview={
            <Txt hover={{ type: "shuffle" }} className="text-left p-2">
              {lorem}
            </Txt>
          }
          options={[
            {
              name: "rate",
              description: "time in ms between each tick",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "characterPool",
              description: "characters that get shuffled on hover",
              type: "string",
              defaultValue: "ABCDE...XYZ",
            },
            {
              name: "delimiter",
              description: "character that separates chunks to shuffle",
              type: "string",
              defaultValue: `" "`,
            },
          ]}
        />

        <EffectCard
          kind="Hover"
          name="Twinkle"
          preview={
            <Txt hover={{ type: "twinkle" }} className="text-left p-2">
              {lorem}
            </Txt>
          }
          options={[
            {
              name: "rate",
              description: "time in ms between each tick",
              type: "number",
              defaultValue: "100",
            },
            {
              name: "characterPool",
              description: "set of characters that can appear",
              type: "string",
              defaultValue: "*^",
            },
            {
              name: "maxNum",
              description:
                "max randomized characters that can appear each tick",
              type: "number",
              defaultValue: "5",
            },
            {
              name: "opacity",
              description: "opacity of the randomized characters",
              type: "number",
              defaultValue: "1",
            },
          ]}
        />

        <EffectCard
          kind="Hover"
          name="Case"
          preview={
            <Txt hover={{ type: "case" }} className="text-left p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Txt>
          }
          options={[
            {
              name: "type",
              description: "whether to make upper or lower case",
              type: `"upper" | "lower"`,
              defaultValue: `"upper"`,
            },
            {
              name: "extraMappings",
              description: "add extra character mappings beyond the alphabet",
              type: `{ [key: string]: string }`,
              defaultValue: "{}",
            },
          ]}
        />

        <SectionTitle title="Morph Effects" />
        <EffectCard
          kind="Morph"
          name="Retype"
          preview={
            <div className="flex flex-row justify-between gap-2 items-center">
              <Txt morph={{ type: "retype" }} className="text-left">
                {morph1 ? "Hello World!" : "Hello Universe!"}
              </Txt>
              <MorphButton morph={morph1} setMorph={setMorph1} />
            </div>
          }
          options={[
            {
              name: "deleteRate",
              description: "time in ms to delete each old character",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "typeRate",
              description: "time in ms to type each new character",
              type: "number",
              defaultValue: "40",
            },
            {
              name: "cursor",
              description: "character to use as cursor",
              type: "string",
              defaultValue: "_",
            },
            {
              name: "keepCommonStart",
              description:
                "whether to only delete different chars or delete all",
              type: "boolean",
              defaultValue: "true",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Gallery;
