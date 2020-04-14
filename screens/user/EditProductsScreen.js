import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/product";

const EditProductsScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  console.log(prodId);
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, price, imageUrl]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "Open-sans-bold",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

const navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    title: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default {
  screen: EditProductsScreen,
  navigationOptions: navigationOptions,
};
