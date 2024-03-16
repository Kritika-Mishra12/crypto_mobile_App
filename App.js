import "text-encoding-polyfill";
import React, { useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, LogBox } from 'react-native';
import ListItem from './components/ListItem';
import RadioButton from './components/RadioButton';
import { getMarketData } from './services/cryptoService';
import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  W3mButton,
} from "@web3modal/wagmi-react-native";

import USDToken from "./src/components/USDToken";
LogBox.ignoreAllLogs();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "e474fc243a25c310ae68f02e21da39b9";

// 2. Create config
const metadata = {
  name: "Crypto Expo",
  description: "Web3Modal Dapp",
  url: "https://web3App.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [polygonMumbai];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function App() {

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('USDT Transfer');

  const newdata = [
    { value: 'USDT Transfer' },
    { value: 'Market Price' },
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])
  const renderOption = () => {
    if (selectedOption === 'Market Price') {
      return (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              logoUrl={item.image}
            />
          )}
        />
      );
    } 
    else {
    return(    
      <WagmiConfig config={wagmiConfig}>
        <View style={styles.container}>
          <W3mButton label="Connect Wallet" />
          <USDToken/>
        </View>
        <Web3Modal />
      </WagmiConfig>
      )
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <RadioButton
          styles={styles.titleWrapper}
          data={newdata}
          onSelect={(value) => setSelectedOption(value)}
          defaultSelected={selectedOption}
        />
        <View style={styles.divider} />
        {renderOption()}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 40,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 17,
    marginTop: 16,
  },
 });