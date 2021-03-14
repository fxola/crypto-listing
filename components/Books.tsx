import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { formatNumber } from "../utils";

interface Props {
  books: Array<number[]>;
}

const Books = ({ books }: Props) => {
  return (
    <View>
      <View style={styles.cell}>
        <Text style={styles.firstTradeItem}>Count</Text>
        <Text style={styles.tradeItem}>Amount</Text>
        <Text style={styles.tradeItem}>Total</Text>
        <Text style={styles.tradeItem}>Price</Text>
      </View>

      {books.map((book, i) => {
        return (
          <View style={styles.cell} key={i}>
            <Text style={styles.firstTradeItem}>{book[1]}</Text>
            <Text style={styles.tradeItem}>
              {parseFloat(String(book[2])).toFixed(4)}
            </Text>
            <Text style={styles.tradeItem}>
              {parseFloat(String(book[2])).toFixed(4)}
            </Text>
            <Text style={styles.tradeItem}>
              {formatNumber(parseInt(String(book[0])))}
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
  firstTradeItem: { flex: 0.25 },
  tradeItem: {
    flex: 0.25,
    textAlign: "center"
  }
});

export default React.memo(Books);
