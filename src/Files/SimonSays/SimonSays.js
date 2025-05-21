import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const _rounded = 10;
const _colors = {
  white: "#FAF9F6",
  green: "#98FB98",
  red: "#E0115F",
  blue: "#0096FF",
  innerCircle: "#000000",
};
const _sizes = {
  white: 125,
  green: 100,
  red: 100,
  blue: 160,
  innerCircle: 38,
};

const SimonSays = () => {
  // State Variables
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  // const [lose, setLose] = useState(false);
  const [userTurn, setUserTurn] = useState(false);
  const [iter, setIter] = useState(0);
  // var randomVar;
  const [userInput, setUserInput] = useState(0);

  const check = (id, mustBe) => {
    // console.log(gameSeq + " " + id);
    if (mustBe === id) {
      // setUserSeq((prev) => [...prev, id]);
      console.log("Correct");
      return true;
    }
    return false;
  };

  // ERASE data
  const erasePreviousData = () => {
    setUserSeq([]);
    setGameSeq([]);
    // setLose(false);
    setUserTurn(false);

    console.log("Previous Data Erased");
  };

  // FLIPs whosever turn it is
  const turnFlipper = () => setUserTurn((prev) => !prev);

  // PC's TURN
  const pcTurn = () => {
    const randomVar = Math.floor(Math.random() * 4) + 1;

    setGameSeq((prev) => {
      const newSeq = [...prev, randomVar];
      console.log("Game Seq : " + newSeq);
      return newSeq;
    });

    console.log("PC's Turn : " + randomVar);
    setTimeout(() => {
      turnFlipper();
    }, 800);
  };

  // takes button ID and CHECKs for processing
  const handleClick = ({ id }) => {
    if (!userTurn) {
      return;
    }

    if (iter < gameSeq.length) {
      if (!check(id, gameSeq[iter])) {
        console.log("User Lost");
        // handleNewGame();
      }
      setIter((prev) => prev + 1);
    }

    console.log(iter + " " + gameSeq.length + "This is being checked here");
    if (iter === gameSeq.length) {
      // console.log("User Won");
      setIter(0);
      turnFlipper();
      setTimeout(() => {
        pcTurn();
      }, 800);
    }
    // console.log("Click : " + gameSeq[iter] + " " + gameSeq + " " + iter);
    console.log("User CLicked : " + id + ". Next is : " + gameSeq[iter]);

    // console.log("User Clicked : " + id);
  };

  // ERASE data & BEGIN
  const handleNewGame = () => {
    erasePreviousData();
    console.log("*****************NEW GAME*****************");
    pcTurn();
  };

  // initialiser
  useEffect(() => {
    handleNewGame();
  }, []);

  // /* UI-Components
  const CircularButton = ({ id, color, height, width, borderRadius }) => {
    return (
      <TouchableOpacity
        style={{
          margin: 5,
          alignItems: "center",
          justifyContent: "center",
          width,
          height,
          borderRadius,
          backgroundColor: color,
        }}
        onPress={() => handleClick({ id })}
      />
    );
  };

  const Block = ({
    id,
    alignItems,
    justifyContent,
    circleStyle,
    height,
    width,
    borderRadius,
  }) => (
    <View style={[styles.block, { alignItems, justifyContent }]}>
      <View
        style={[
          styles.circle,
          {
            height,
            width,
            borderRadius,
          },
          circleStyle,
        ]}
      >
        {}
        <CircularButton
          id={id}
          color={_colors.innerCircle}
          height={height - _sizes.innerCircle}
          width={width - _sizes.innerCircle}
          borderRadius={(height - _sizes.innerCircle) / 2}
        />
      </View>
    </View>
  );

  // UI-Components */
  return (
    <View style={styles.container}>
      {/* <View style={styles.scoreBoard}>
        <Text style={{ color: "white", fontSize: 15 }}>Score:</Text>
        <Text style={[styles.scoreBoardElem]}>{score}</Text>
      </View> */}

      <View style={styles.simonGame}>
        <View style={styles.row}>
          <Block
            id={1}
            alignItems="flex-end"
            justifyContent="flex-end"
            height={_sizes.white}
            width={_sizes.white}
            borderRadius={_sizes.white / 2}
            circleStyle={styles.whiteCircle}
          />

          <Block
            id={2}
            alignItems="flex-start"
            justifyContent="flex-end"
            height={_sizes.green}
            width={_sizes.green}
            borderRadius={_sizes.green / 2}
            circleStyle={styles.greenCircle}
          />
        </View>
        <View style={styles.row}>
          <Block
            id={3}
            alignItems="flex-end"
            justifyContent="flex-start"
            height={_sizes.red}
            width={_sizes.red}
            borderRadius={_sizes.red / 2}
            circleStyle={styles.redCircle}
          />
          <Block
            id={4}
            alignItems="flex-start"
            justifyContent="flex-start"
            height={_sizes.blue}
            width={_sizes.blue}
            borderRadius={_sizes.blue / 2}
            circleStyle={styles.blueCircle}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          marginTop: 20,
          backgroundColor: "red",
          height: 50,
          width: 100,
          zIndex: 1,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          bottom: 50,
          zIndex: 1,
          // right: 10,
          alignSelf: "center",
        }}
        // show text on touchable opacity
        onPress={() => handleNewGame()}
      >
        <Text style={{ color: "white", padding: 10 }}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 20,
    flexDirection: "column",
    zIndex: -1,
  },

  simonGame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    //shifting the view a little bit left
    // left: -10,
  },

  circle: {
    borderRadius: 50,
    backgroundColor: "#e9103b",
    margin: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },

  block: {
    // backgroundColor: "gray",
    // aspectRatio: 1,
    flex: 1,
    margin: 3,
    padding: 3,
  },

  whiteCircle: {
    backgroundColor: _colors.white,
    borderBottomRightRadius: _rounded,
  },

  greenCircle: {
    backgroundColor: _colors.green,
    borderBottomLeftRadius: _rounded,
  },

  redCircle: {
    backgroundColor: _colors.red,
    borderTopRightRadius: _rounded,
  },

  blueCircle: {
    backgroundColor: _colors.blue,
    borderTopLeftRadius: _rounded,
  },

  scoreBoard: {
    position: "absolute",
    alignItems: "center",
    top: 75,
    right: 40,
    padding: 10,

    backgroundColor: "rgba(100, 100, 100, 0.15)",
    flexDirection: "column",
    borderRadius: 10,
    borderColor: "rgba(232, 175, 255, 0.15)",
    borderWidth: 1,
  },

  scoreBoardElem: {
    color: "#fcadd8",
    fontSize: 15,
    marginTop: 5,
    fontSize: 60,
    fontWeight: 800,
    marginTop: -10,
  },

  instruction: {
    position: "absolute",
    top: 75,
    right: 125,
    left: 80,
    backgroundColor: "rgba(100, 100, 100, 0.15)",
    padding: 10,
    borderRadius: 10,
    zIndex: -1,
  },
});

export default SimonSays;
