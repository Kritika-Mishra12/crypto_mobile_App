import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from 'bignumber.js';
import USDTokenABI from "../abis/USDTokenABI.json";

export default function MintSection() {

  const [receiverAddress, setReceiverAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(new BigNumber(0));
  // Reading the Contract
  const {
    data: contractName,
    isError,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: "0xEa987c50Bd83FeeFD2e0244C54e0e49F3d3092aA",
    abi: USDTokenABI,
    functionName: "name",
  });

  // Writing to the Contract
  const { config } = usePrepareContractWrite({
    address: "0xEa987c50Bd83FeeFD2e0244C54e0e49F3d3092aA",
    abi: USDTokenABI,
    functionName: "transfer",
    args: [receiverAddress, transferAmount.toFixed()],
  });

  const {
    data: USDTData,
    isLoading: isLoadingMint,
    isSuccess: isSuccessMint,
    write: transfer,
  } = useContractWrite(config);

  const handleTransfer = () => {
    if (receiverAddress && transferAmount) {
      transfer?.();
    } else {
      // Handle validation or show an error message
      console.error('Receiver address and a valid transfer amount are required');
    }
  };

  return (
    <View style={styles.marginVertical}>
    <TextInput
      style={{
        height: 40,
        borderColor: 'black',
        borderWidth: 3,
        margin: 10,
        fontSize: 35,
      }}
      onChangeText={(text) => setReceiverAddress(text)}
      placeholder="Receiver Wallet Address"
      value={receiverAddress}
    />

    <TextInput
      style={{
        height: 50,
        borderColor: 'black',
        borderWidth: 3,
        margin: 10,
        fontSize: 35,
      }}
      onChangeText={(text) => {
        const amount = new BigNumber(text);
        setTransferAmount(amount.isNaN() ? new BigNumber(0) : amount);
      }}
      placeholder="Transfer Amount"
      value={transferAmount.toString()} // Display the number as a string in the TextInput
      keyboardType="numeric"
    />
    <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.centerText}>Transfer</Text>
      </TouchableOpacity>
      {isLoading && <Text>Check Wallet</Text>}
      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        Transaction:
      </Text>
      {isSuccess && (
        <Text style={{ textAlign: "center" }}>{JSON.stringify(USDTData)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  marginVertical: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#57B36A",
    padding: 10,
    width: 140,
    borderRadius: 32,
  },
});
