import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";

const injected = new InjectedConnector();

const Home: NextPage = () => {
  const { activate, active, library: provider } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (e) {
      console.log(e);
    }
  };
  const execute = async () => {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  return (
    <div>
      {active ? (
        "Connected! "
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}

      {active ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
};

export default Home;
