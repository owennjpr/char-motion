import React, { useEffect, useState, useRef } from "react";
import { Enter, Hover, Morph, LetterState, HoverState } from "@types";
import { enterEffects } from "../enterMap";
import { hoverEffects } from "../hoverMap";
import { morphEffects } from "../morphMap";

interface TxtProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: string;
  enter?: Enter | null;
  hover?: Hover | null;
  morph?: Morph | null;
}

export const Txt = (props: TxtProps) => {
  const { children, enter = null, hover = null, morph = null, ...rest } = props;

  const [text, setText] = useState<LetterState[]>([]);
  const textRef = useRef<LetterState[]>([]);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const hoveringRef = useRef<HoverState>({
    hover: false,
    index: -1,
  });

  // inform when you can hover
  const [entered, setEntered] = useState<boolean>(false);
  const [morphing, setMorphing] = useState<boolean>(false);

  // update whenever state changes, but don't trigger effects
  textRef.current = text;
  hoveringRef.current = {
    hover: isHovering,
    index: hoverIndex,
  };

  // refs to reduce need for rerendering / retriggering effects
  const enterRef = useRef<Enter | null>(enter);
  const hoverRef = useRef<Hover | null>(hover);
  const morphRef = useRef<Morph | null>(morph);

  useEffect(() => {
    enterRef.current = enter;
  }, [enter]);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  useEffect(() => {
    morphRef.current = morph;
  }, [morph]);

  useEffect(() => {
    let active = true;

    // if the children change but the component already
    // entered / there is no enter anim, then just set to the new child
    const initialLetters = children
      .split("")
      .map((c) => ({ char: entered || !enterRef.current ? c : "", target: c }));

    if (!entered) {
      setText(initialLetters);

      (async () => {
        if (enterRef.current && enterEffects[enterRef.current.type])
          await enterEffects[enterRef.current.type](
            initialLetters,
            (t) => active && setText(t),
            enterRef.current.options
          );

        if (active) setEntered(true);
      })();
    } else if (morphRef.current && morphEffects[morphRef.current.type]) {
      setMorphing(true);
      (async () => {
        if (morphRef.current)
          await morphEffects[morphRef.current.type](
            initialLetters,
            (t) => active && setText(t),
            morphRef.current.options,
            () => {
              return hoveringRef.current;
            },
            textRef.current
          );
        if (active) setMorphing(false);
      })();
    } else {
      setText(initialLetters);
    }

    return () => {
      active = false;
    };
  }, [children, entered]);

  useEffect(() => {
    if (!hoverRef.current || !entered || morphing) return;

    let active = true;

    (async () => {
      if (hoverRef.current && hoverEffects[hoverRef.current.type]) {
        await hoverEffects[hoverRef.current.type](
          textRef.current,
          (t) => active && setText(t),
          hoverRef.current.options,
          () => {
            return hoveringRef.current;
          }
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [children, isHovering, entered, morphing]);
  return (
    <p
      {...rest}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverIndex(-1);
      }}
    >
      {text.map((l, i) => (
        <span
          key={i}
          className={l.className}
          style={l.style}
          onMouseEnter={() => setHoverIndex(i)}
        >
          {l.char}
        </span>
      ))}
    </p>
  );
};
