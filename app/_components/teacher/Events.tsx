"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

export default function Events() {
  return (
    <Accordion className="text-black" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">
          8th Graders Ceremony
        </AccordionTrigger>
        <AccordionContent>
          There will be a ceremony to celebrate the achievements of the 8th
          graders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold">
          Parent-Teacher Conference
        </AccordionTrigger>
        <AccordionContent>
          Meet with teachers to discuss student progress and concerns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold">Science Fair</AccordionTrigger>
        <AccordionContent>
          Students will showcase their science projects and experiments.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-bold">
          Field Trip to the Museum
        </AccordionTrigger>
        <AccordionContent>
          Students will visit the museum to learn about history and art.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
