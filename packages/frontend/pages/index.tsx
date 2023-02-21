import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [prompt, setPrompt] = useState<string>("");

  return <></>;
}
