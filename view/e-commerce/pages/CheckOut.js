import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
// import Address from "../components/Address";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../App";
import axios from "axios";

export default function CheckOut({ navigation }) {
  const { data } = useContext(AppContext);
  const id = data[2];
  // console.log(id);
  navigation.setOptions({
    title: "CheckOut",
    headerStyle: {
      backgroundColor: "#EFEFF2",
    },
    headerTintColor: "#000",
  });

  console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd", id);
  const deleteOrders = async () => {
    try {
      const response = await axios.delete(
        "https://backend-e-commerce-nffh.onrender.com/users/delete-order",
        {
          data: {
            userID: id,
          },
        }
      );
      console.log(response.data);
      navigation.navigate("Congratulation");
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  const [address, setAddress] = useState([
    {
      text: "Home",
      mobile: "0789895656",
      buildingNo: 78,
      street: "University Street",
      city: "Irbid",
      checked: true,
      key: "1",
    },
    {
      text: "Office",
      mobile: "0775452323",
      buildingNo: 8,
      street: "Maccah Street",
      city: "Amman",
      checked: false,
      key: "2",
    },
  ]);

  const [paymentAmount, setPaymentAmount] = useState([
    {
      subtotal: 100,
      deliveryFee: 2,
    },
  ]);
  const total =
    paymentAmount.length > 0
      ? paymentAmount[0].subtotal + paymentAmount[0].deliveryFee
      : 0;

  return (
    // to let the keyboard disappear when clicking anywhere
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* header */}
          {/* Delivery address */}
          <View style={styles.content}>
            <Text style={styles.subtitle}>Delivery address</Text>
            <View style={styles.addressInfo}>
              <FlatList
                data={address}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => pressHandler(item.key)}>
                    <View style={styles.item}>
                      <View style={styles.address}>
                        {item.checked === true ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <Feather name="circle" size={24} color="grey" />
                        )}
                        <View>
                          <Text style={styles.itemText}>{item.text}</Text>
                          <Text style={styles.itemTextMobile}>
                            {item.mobile}
                          </Text>
                          <Text style={styles.itemTextStreet}>
                            {item.buildingNo}, {item.street}, {item.city}
                          </Text>
                        </View>
                      </View>

                      <AntDesign name="edit" size={24} color="grey" />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* Billing information */}
          <View style={styles.content}>
            <Text style={styles.subtitle}>Billing information</Text>
            <View style={styles.billingInfo}>
              <FlatList
                data={paymentAmount}
                renderItem={({ item }) => (
                  <View>
                    <View style={styles.billing}>
                      <Text style={styles.billingText}>Subtotal :</Text>
                      <Text style={styles.billingNumber}>
                        $ {item.subtotal}
                      </Text>
                    </View>
                    <View style={styles.billing}>
                      <Text style={styles.billingText}>Delivery Fee :</Text>
                      <Text style={styles.billingNumber}>
                        $ {item.deliveryFee}
                      </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.billing}>
                      <Text style={styles.billingText}>Total :</Text>
                      <Text style={styles.billingNumber}>$ {total}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
          {/* Payment method */}
          <View style={styles.content}>
            <Text style={styles.subtitle}>Payment Method</Text>
            <View style={styles.images}>
              <Image
                style={styles.image}
                source={require("../assets/mastercard.png")}
              />
              <Image
                style={styles.image}
                source={require("../assets/paypal1.png")}
              />
            </View>
            <TouchableOpacity
              style={styles.paymentBtnContainer}
              onPress={() => deleteOrders()}
            >
              <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
              <Text style={styles.paymentBtnText}>Complete Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfd",
    paddingVertical: 40,
  },
  // header
  header: {
    height: 100,
    paddingTop: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    marginLeft: 30,
  },
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 100,
  },
  //Delivery Address
  item: {
    padding: 16,
    marginTop: 10,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  address: {
    borderColor: "#bbb",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 10,
  },
  itemTextMobile: {
    marginLeft: 10,
    color: "gray",
  },
  itemTextStreet: {
    marginLeft: 10,
    color: "gray",
  },

  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addressInfo: {
    flex: 1,
  },
  billingInfo: {
    marginTop: 20,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 16,
  },
  billing: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billingText: {
    color: "#808080",
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  images: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  paymentBtnContainer: {
    marginTop: 10,
    backgroundColor: "#b7076b",
    borderRadius: 10,
    alignSelf: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    flexDirection: "row",
  },
  paymentBtnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
