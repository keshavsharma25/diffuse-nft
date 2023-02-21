import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
