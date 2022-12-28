import { Data } from "@/utils/types";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  response: Data | null;
  setResponse: React.Dispatch<React.SetStateAction<Data | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export const Prompt = ({
  response,
  setResponse,
  setIsLoading,
  isLoading,
}: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  // const [id, setId] = useState<string>("");

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    const resp = await (
      await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      })
    ).json();

    console.log("set response:", resp);
    console.log("set response id:", resp.id);

    setIsLoading(true);
    setResponse(resp);
  };

  useEffect(() => {
    console.log("useEffect: prompt is set to:", prompt);

    if (response?.status === "created") {
      const checkResponse = setInterval(async () => {
        console.log("checkResponse id", response?.id);

        const checkApiRes = await (
          await fetch(`/api/check?id=${response?.id}`)
        ).json();

        if (checkApiRes.status === "succeeded") {
          setIsLoading(false);
          setResponse(checkApiRes);
          clearInterval(checkResponse);
        } else if (checkApiRes.status === "error") {
          setIsLoading(false);
          setResponse(checkApiRes);
          clearInterval(checkResponse);
        } else if (checkApiRes.status === "failed") {
          setIsLoading(false);
          setResponse(checkApiRes);
          clearInterval(checkResponse);
        }
      }, 5000);
    }
  }, [response, prompt]);

  return (
    <Flex alignItems={"center"} justifyContent="center" pt={"2rem"}>
      <Input
        placeholder="Enter a prompt"
        size="lg"
        w="45%"
        focusBorderColor={"grey"}
        onChange={handlePrompt}
      />
      {!isLoading ? (
        <Button size={"lg"} type="submit" onClick={onSubmit}>
          Enter
        </Button>
      ) : (
        <Button size={"lg"} type="submit" isLoading disabled>
          Enter
        </Button>
      )}
    </Flex>
  );
};
