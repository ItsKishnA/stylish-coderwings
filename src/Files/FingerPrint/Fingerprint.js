import { StyleSheet, Text, View } from "react-native";

const Fingerprint = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.bullet}>{"\u2B24"}</Text>
      <Text style={styles.text}>ɛƖ.AvI.ator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
    //positioning at the end of the screen
    position: "absolute",
    bottom: 0,
    // marginTop: 10,
  },

  line: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#0091ab",
    margin: 15,
    marginRight: 5,
  },

  text: {
    fontSize: 13,
    color: "#03c6e3",
    // color: "white",
    textAlign: "center",
    marginHorizontal: 15,
    textAlignVertical: "center",
    // fontWeight: "bold",
    // backgroundColor: "white",
  },
  bullet: {
    fontSize: 10,
    color: "white",
    textAlignVertical: "center",
  },
});

export default Fingerprint;
