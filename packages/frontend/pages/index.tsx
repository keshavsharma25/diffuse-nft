import { Navbar, OneClickHeading, Prompt } from "@/components/frontend";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Navbar />
      <OneClickHeading />

      <Prompt />
    </>
  );
}
