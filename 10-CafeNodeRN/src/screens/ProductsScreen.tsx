import React, { useContext, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

export const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext);

  //Pull to refresh

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('ProductScreen', {})}
        >
          <Text style={{ color: 'black' }}>Add Product</Text>
        </TouchableOpacity>
      )
    });
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}
          >
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 20
  },
  itemSeparator: {
    borderBottomWidth: 1,
    marginVertical: 5,
    borderBottomColor: 'rgba(208, 171, 0, 0.4)',
  },
});