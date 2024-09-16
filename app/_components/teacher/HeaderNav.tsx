"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname(); // Get the current route path

  // Remove "/teacher" part and split the remaining path into segments
  const pathSegments = pathname
    .replace("/teacher", "")
    .split("/")
    .filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First breadcrumb as "Overall" */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/teacher">Overall</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic breadcrumbs for the rest of the path */}
        {pathSegments.map((segment, index) => {
          // Capitalize the first letter of each segment
          const segmentName =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          // Create the path up to the current segment
          const href = `/teacher/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === pathSegments.length - 1 ? (
                  <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segmentName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
