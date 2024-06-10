"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Description() {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <p
                className={`text-xs pt-[64px] text-muted-foreground leading-5 ${
                    !show ? "overflow-ellipsis line-clamp-3" : null
                } `}
            >
                {/* {category?.description} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                sint hic porro iusto! Dignissimos quas eligendi hic. Unde eius
                repellendus, porro harum amet, animi obcaecati nesciunt sequi
                ipsa earum alias. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Officia accusamus dolores inventore, sed nulla
                autem neque amet molestiae modi voluptatem maxime totam facilis
                cum culpa non blanditiis. Eaque, minima consequuntur.
            </p>
            <div className="flex items-center justify-center mt-3">
                <Button
                    size="sm"
                    variant="link"
                    onClick={() => setShow((el) => !el)}
                >
                    {show ? "Hide" : "Show More"}
                </Button>
            </div>
        </>
    );
}

export default Description;
