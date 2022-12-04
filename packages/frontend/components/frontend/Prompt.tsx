import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  prompt: string;
  setResponse: any;
};

export const Prompt = (props: Props) => {
  const [prompt, setPrompt] = useState("");

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const sendPrompt = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    props.setResponse(data);
  };

  return (
    <Flex alignItems={"center"} justifyContent="center" pt={"2rem"}>
      <Input
        placeholder="Enter a prompt"
        size="lg"
        w="45%"
        focusBorderColor={"grey"}
        onChange={handlePrompt}
      />
      <Button size={"lg"} type="submit" onClick={sendPrompt}>
        Enter
      </Button>
    </Flex>
  );
};
