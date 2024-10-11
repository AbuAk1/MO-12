import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, Text, View, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Button ,Alert} from "react-native";
import { useState, useEffect } from "react";

import { app } from "./firebaseConfig";
import { getDatabase, ref, push, onValue, remove, get } from "firebase/database";

export default function App() {
  const [firstUnderlineColor, setFirstUnderlineColor] = useState("grey");
  const [secondUnderlineColor, setsecondUnderlineColor] = useState("grey");
  const handleFirstFocus = () => {
    setFirstUnderlineColor("#03fcfc");
  };
  const handleFirstBlur = () => {
    setFirstUnderlineColor("grey");
  };
  const handleSecondFocus = () => {
    setsecondUnderlineColor("#03fcfc");
  };
  const handleSecondBlur = () => {
    setsecondUnderlineColor("grey");
  };

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });

  const [items, setItems] = useState([]);

  const database = getDatabase(app);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataItems = Object.keys(data).map(key => {
          return {
            id: key,          
            ...data[key]      
          };
        });
        // console.log(dataItems);

        setItems(dataItems);
      } else {
        setItems([]); // Handle the case when there are no items
      }
    })
  }, []);


  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);
      setProduct({ title: '', amount: '' });
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }


  const handleDelete = (item) => {
    const itemRef = ref(database, `items/${item.id}`);
    remove(itemRef);

  }



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputs}>
        <TextInput
          style={[styles.inputfield, { underlineColorAndroid: firstUnderlineColor }]}
          underlineColorAndroid={firstUnderlineColor}
          onFocus={handleFirstFocus}
          onBlur={handleFirstBlur}
          onChangeText={text => setProduct({ ...product, title: text })}
          value={product.title}
          placeholder="Product"
          keyboardType="default"
        />
        <TextInput
          style={[styles.inputfield, { underlineColorAndroid: secondUnderlineColor }]}
          value={product.amount}
          underlineColorAndroid={secondUnderlineColor}
          onFocus={handleSecondFocus}
          onBlur={handleSecondBlur}
          onChangeText={text => setProduct({ ...product, amount: text })}
          placeholder="Quantity"
          keyboardType="default"
        />
      </View>

      <View style={styles.buttons}>
        <Button title="Save" onPress={handleSave} />
      </View>

      <Text style={styles.text}>Shopping List</Text>

      <FlatList
        renderItem={({ item }) =>
          <View style={styles.item}>
            <Text style={{ fontSize: 18 }}>{item.title}, {item.amount} 
            <Text style={styles.link} onPress={() => handleDelete(item)} > delete</Text>
            </Text>
          </View>}
        data={items} />

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "20%",
  },
  inputs: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
  },
  inputfield: {
    width: "100%",
    borderWidth: 0.5,
    borderBlockColor: "grey",
    padding: 10,
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "50%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#3458eb",
    paddingTop: 20,
  },
  item: {
    flexDirection: "row",
    textAlign: 'left',
    fontWeight: "bold",
    padding: 2,
    marginVertical: 2,
    width: "100%",

  },
  link: {
    color: "blue",
    textDecorationLine: "none",
    fontSize: 18,
  },
});