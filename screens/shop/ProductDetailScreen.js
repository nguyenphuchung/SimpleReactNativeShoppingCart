import React from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((node) => node.id === productId)
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default {
  screen: ProductDetailScreen,
  navigationOptions: {
    title: "Product Details",
  },
};
