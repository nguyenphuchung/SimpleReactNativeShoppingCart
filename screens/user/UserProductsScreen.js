import React from "react";
import { FlatList, StyleSheet, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../contants/Colors";
import * as productActions from "../../store/actions/product";

const UserProductSreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProducts", { productId: id });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
          ></Button>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

const navigationOptions = (navData) => {
  return {
    title: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProducts");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default {
  screen: UserProductSreen,
  navigationOptions: navigationOptions,
};
