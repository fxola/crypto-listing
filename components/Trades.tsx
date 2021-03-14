import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { formatNumber } from "../utils";

interface Props {
  trades: Array<number[]>;
}

const Trades = ({ trades }: Props) => {
  return (
    <View>
      <View style={styles.cell}>
        <Text style={styles.firstTradeItem}>Time</Text>
        <Text style={styles.tradeItem}>Price</Text>
        <Text style={styles.tradeItem}>Amount</Text>
      </View>
      {trades.map((trade: number[], i) => {
        return (
          <View style={styles.cell} key={i + trade[1]}>
            <Text style={styles.firstTradeItem}>
              {new Date(trade[1]).toLocaleTimeString()}
            </Text>
            <Text style={styles.tradeItem}>
              {formatNumber(parseInt(String(trade[3])))}
            </Text>
            <Text style={styles.tradeItem}>
              {parseFloat(String(trade[2])).toFixed(4)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  },
  firstTradeItem: { flex: 0.3 },
  tradeItem: {
    flex: 0.35,
    textAlign: "center"
  }
});

export default React.memo(Trades);
