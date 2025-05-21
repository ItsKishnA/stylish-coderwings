import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Facebook2 from "./../../assets/Facebook (1).png";
import Apple from "./../../assets/Facebook.png";
import Google from "./../../assets/Google.png";

const index = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.Container}>
      <Text style={styles.WelcomeText}>Welcome </Text>
      <Text style={styles.WelcomeText}>Back! </Text>

      <View style={styles.InputFieldContainer}>
        <TextInput
          value={mail}
          onChangeText={setMail}
          style={styles.InputField}
        />
        <TextInput
          value={pass}
          onChangeText={setPass}
          style={styles.InputField}
        />

        {/* <TextInput value={pass} onChangeText={setPass} /> */}

        <Link href={""} style={styles.Link}>
          <Text style={styles.LinkText}>Forgot Password?</Text>
        </Link>
      </View>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonText}>Login</Text>
      </TouchableOpacity>

      <Text>Or Continue With</Text>

      <View style={styles.LinksContainer}>
        <TouchableOpacity>
          <Image
            // style={}
            height={25}
            width={25}
            source={Apple}
            style={styles.LinkButton}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            // style={}
            height={25}
            width={25}
            source={Facebook2}
            style={styles.LinkButton}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            // style={}
            height={25}
            width={25}
            source={Google}
            style={styles.LinkButton}
          />
        </TouchableOpacity>
      </View>

      <Text>Create an account</Text>
      <Link href={""}>
        <Text>Sign Up</Text>
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 20,
  },

  WelcomeText: {
    fontSize: 45,
    // letterSpacing: 1.5,
    fontWeight: 800,
  },
  InputFieldContainer: {
    display: "flex",
    gap: 8,
  },
  InputField: {
    backgroundColor: "#A8A8A9",
    borderColor: "#585859",
    borderWidth: 2,
    borderRadius: 5,
    height: "55px",
  },
});
