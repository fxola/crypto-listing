import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { formatNumber } from "../utils";

const Ticker = ({ ticker }) => {
  return (
    <View>
      <View style={styles.cell}>
        <Text>BTC/USD</Text>
        <Text>{formatNumber(parseInt(ticker[6]))}</Text>
      </View>
      <View style={styles.cell}>
        <Text>
          VOL
          {formatNumber(
            parseInt(String(Number(ticker[7]) * Number(ticker[6])))
          )}
          BTC
        </Text>
        <Text>
          {ticker[4]} ({parseFloat(String(Number(ticker[5]) * 100)).toFixed(2)}
          %)
        </Text>
      </View>
      <View style={styles.cell}>
        <Text>LOW {formatNumber(Number(ticker[9]))}</Text>
        <Text>HIGH {formatNumber(Number(ticker[8]))}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  }
});

export default React.memo(Ticker);
