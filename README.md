[![NPM](https://nodei.co/npm/@char-motion/react.svg?style=flat&data=n,v)](https://nodei.co/npm/@char-motion/react/) ![Vercel Deploy](https://deploy-badge.vercel.app/vercel/char-motion) ![License](https://img.shields.io/badge/license-MIT-blue)

# Char Motion

Char(acter) Motion is an [npm package](https://www.npmjs.com/package/@char-motion/react) containing a collection of ASCII character based text animations/effects for use in React applications. To read the docs, see examples, and get more information, check out the [website](https://char-motion.vercel.app/)

This readme is broken into:

1. [Package Usage](#package-usage)
2. [How to Contribute](#contribution)
3. [Credits](#credits)

# Package Usage

## Installation

        npm i @char-motion/react

## Basic Usage

        import { Txt } from "@char-motion/react";

        <Txt enter={{ type: "typed sweep" }}>
            Hello World!
        </Txt>

more examples [here](https://char-motion.vercel.app/)

## Current Effects

Effects are split into different categories based on when they trigger. This package is relatively new so there aren't too many effects yet.

### Enters

Effects that trigger when the Txt object is first initialized

- typed sweep: characters type in as if written in a terminal
- randomized: characters appear in random order with an intermediate jumbled state
- number sweep: numbers shuffle and stabilize one by one
- cocktail shaker: characters start in randomized positions and resolve via cocktail shaker sorting

### Hovers

Effects that trigger when the Txt object is hovered over

- typed sweep: a cursor character moves left to right through the text and idly flickers at the end
- twinkle: characters are randomly swapped out and put back at regular intervals
- shuffle: text between delimiter characters is randomly shuffled
- case: switches text to upper or lower case

### Morphs

Effects that trigger when the child string is changed

- retype: deletes the characters right to left and retypes them left to right

# Contribution

I very much welcome contributions from anyone who has a cool idea for how to expand or improve this project. This section is meant for developers who want to directly work in this codebase, but if you have a suggestion you’re not sure how to implement, please feel free to open a feature request issue, I'd love to hear your ideas!

To get started, run:

        git clone https://github.com/owennjpr/char-motion.git
        cd char-motion

Now you have all the code for both the package itself (/packages/react) and the website (/website). From here you need to install all necessary node modules and build the local version of the package:

        npm install
        npm run build:react

Its important to note that you will need to rerun the build command whenever you make changes to the package if you want to see them reflected in the website dev build. Speaking of the dev build, run the following command to start it running on http://localhost:3000/:

        npm run dev

To test your changes to the package:

1.  In the /website/src/app directory, create a new folder called test
2.  In this folder create a page.tsx file with this initial boilerplate:

        "use client";
        import { Txt } from "@char-motion/react";
        import React from "react";

        function Test() {
          return <Txt>Hello World!</Txt>;
        }

        export default Test;

3.  run npm run dev if you haven't yet, and go to http://localhost:3000/test to see the hello world.

Please make all your website edits in this ignored "test" directory, unless you are making an intentional change to the website (i.e adding your new effect description to the gallery page)

# Credits

This package is created and managed by [Owen Prendergast](https://github.com/owennjpr).

Thank you to [LordofManKid](https://github.com/LordofMankid) for early testing and contributions!

Home page logo on the website was made with [patorjk's text to ASCII art generator](https://patorjk.com/software/taag/)
