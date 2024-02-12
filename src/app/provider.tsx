"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalCssPriority from "@/globalcss-priority";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GlobalCssPriority>
      <CssBaseline />
      {children}
    </GlobalCssPriority>
  );
}
