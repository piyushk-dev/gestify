// app/components/
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Optional: Customize style
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 400); // delay to show shimmer or loading effect

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
