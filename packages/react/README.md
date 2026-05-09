# Char Motion

Char(acter) Motion is a collection of ASCII character based text animations/effects for use in React applications.
To read the docs, see examples, and get more information, check out the [website](https://char-motion.vercel.app/).

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

Effects that trigger when the Txt object is first initialized.

- typed sweep: characters type in as if written in a terminal
- randomized: characters appear in random order with an intermediate jumbled state
- number sweep: numbers shuffle and stabilize one by one
- sort: characters start in randomized positions and resolve via a sorting algorithm

### Hovers

Effects that trigger when the Txt object is hovered over.

- typed sweep: a cursor character moves left to right through the text and idly flickers at the end
- twinkle: characters are randomly swapped out and put back at regular intervals
- shuffle: text between delimiter characters is randomly shuffled
- case: switches text to upper or lower case

### Morphs

Effects that trigger when the child string is changed.

- retype: deletes the characters right to left and retypes them left to right

Web home page logo made with [patorjk's text to ASCII art generator](https://patorjk.com/software/taag/).
