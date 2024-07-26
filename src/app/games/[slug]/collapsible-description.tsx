"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import parse, {
  attributesToProps,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import type { DOMNode } from "html-dom-parser";

function Description({ description }: { description: string }) {
  const [show, setShow] = useState<boolean>(false);

  const options: HTMLReactParserOptions = {
    replace({ attribs, children }: any) {
      if (!attribs) {
        return;
      }

      if (attribs.name === "h3") {
        return <h3 className="text-xl">{domToReact(children, options)}</h3>;
      }
      if (attribs.name === "ol") {
        return (
          <ol className="list-decimal">{domToReact(children, options)}</ol>
        );
      }
      if (attribs.name === "ul") {
        return <ol className="list-disc">{domToReact(children, options)}</ol>;
      }
    },
  };

  return (
    <div>
      <p
        className={`text-xs text-muted-foreground leading-5 ${
          !show ? "overflow-ellipsis line-clamp-3" : null
        } `}
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <div className="flex items-center justify-center mt-3">
        {description && (
          <Button size="sm" variant="link" onClick={() => setShow((el) => !el)}>
            {show ? "Hide" : "Show More"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Description;
