"use client";
import LinkButton from "./components/LinkButton";
import { Txt } from "@char-motion/react";

export default function Home() {
  return (
    <div className="w-full h-screen p-4 font-cutive flex flex-col justify-between">
      <div className="w-full h-full flex flex-col justify-center items-center text-center">
        <Txt
          enter={{
            type: "randomized",
            options: { duration: 2000, easing: "easeOut" },
          }}
          hover={{
            type: "twinkle",
            options: {
              rate: 50,
              maxNum: 5,
              characterPool: "*^",
            },
          }}
          className="text-[1.25vw]/2 md:text-xs/3 w-4/5 md:w-[700px] md:h-[110] whitespace-pre-wrap tracking-tighter"
        >{`                                                                                                      
              ,,                                                              ,,                     
  .g8"""bgd ${"`"}7MM                              ${"`"}7MMM.     ,MMF'         mm     db                     
.dP'     ${"`"}M   MM                                MMMb    dPMM           MM                            
dM'       ${"`"}   MMpMMMb.   ,6"Yb.  ${"`"}7Mb,od8       M YM   ,M MM  ,pW"Wq.mmMMmm ${"`"}7MM  ,pW"Wq.${"`"}7MMpMMMb.  
MM            MM    MM  8)   MM    MM' "'       M  Mb  M' MM 6W'   ${"`"}Wb MM     MM 6W'   ${"`"}Wb MM    MM  
MM.           MM    MM   ,pm9MM    MM           M  YM.P'  MM 8M     M8 MM     MM 8M     M8 MM    MM  
${"`"}Mb.     ,'   MM    MM  8M   MM    MM           M  ${"`"}YM'   MM YA.   ,A9 MM     MM YA.   ,A9 MM    MM  
  ${"`"}"bmmmd'  .JMML  JMML.${"`"}Moo9^Yo..JMML.       .JML. ${"`"}'  .JMML.${"`"}Ybmd9'  ${"`"}Mbmo.JMML.${"`"}Ybmd9'.JMML  JMML.`}</Txt>

        <div className="flex flex-col items-center">
          <Txt className="text-sm/4 sm:text-base/5 py-4 w-5/6 max-w-3xl">
            A collection of ASCII character based text animations built with
            React and TypeScript and bundled into an npm package. This site
            includes documentation for the package as well as examples and code
            snippets for individual effects.
          </Txt>
          <Txt
            enter={{
              type: "typed sweep",
              options: { rate: 60, startDelay: 1500 },
            }}
            className="pb-4 h-10 text-sm sm:text-base"
          >
            npm i @char-motion/react
          </Txt>
          <div className="w-full flex flex-col sm:flex-row items-center sm:justify-around font-cutive gap-2">
            <LinkButton path={"documentation"}>
              <Txt
                hover={{ type: "case" }}
                className="text-base/3 sm:text-xl/4 whitespace-pre-wrap w-[240]"
              >
                {`+---------------+
| documentation |
+---------------+`}
              </Txt>
            </LinkButton>
            <LinkButton path={"gallery"}>
              <Txt
                hover={{ type: "case" }}
                className="text-base/3 sm:text-xl/4 whitespace-pre-wrap w-[240]"
              >
                {`+----------------+
| effect gallery |
+----------------+`}
              </Txt>
            </LinkButton>
          </div>
          <div className="flex flex-row pt-4 gap-4 items-center ">
            <a
              href="https://github.com/owennjpr/char-motion"
              className="opacity-50"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 98 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  fill="#fff"
                />
              </svg>
            </a>
            <Txt className="text-sm">v0.3.1</Txt>
            <a
              href="https://www.npmjs.com/package/@char-motion/react"
              className="opacity-50"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 0H0V24H24V0ZM2.57764 2.57758H21.4214V21.4214H16.6694V7.32957H11.9175V21.4214H2.57764V2.57758Z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>

          <Txt className="text-sm pt-2">Created by Owen Prendergast</Txt>
        </div>
      </div>
    </div>
  );
}
