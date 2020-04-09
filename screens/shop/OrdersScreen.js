import React from "react";
import { Text, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  return (
    <FlatList
      data={orders}
      keyExactor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

const navigationOptions = (navData) => {
  return {
    title: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer("Cart");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default {
  screen: OrdersScreen,
  navigationOptions: navigationOptions,
};
