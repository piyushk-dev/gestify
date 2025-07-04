"use client";

import Link from "next/link";
import NProgress from "nprogress";
import React from "react";

type CustomLinkProps = React.ComponentProps<typeof Link>

export default function CustomLink({ children, ...props }: CustomLinkProps) {
  const handleClick = () => {
    NProgress.start();
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
