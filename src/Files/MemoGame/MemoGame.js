import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const ROWS = 3,
  COLUMNS = 4,
  TILES = ROWS * COLUMNS;

const CardImages = [
  { image: require(`../../../assets/Tiles/tile-back-cover.png`) },

  { image: require(`../../../assets/Tiles/Chinese/b.png`) },
  { image: require(`../../../assets/Tiles/Chinese/c.png`) },
  { image: require(`../../../assets/Tiles/Chinese/f.png`) },
  { image: require(`../../../assets/Tiles/Chinese/g.png`) },

  { image: require(`../../../assets/Tiles/Chinese/h.png`) },
  { image: require(`../../../assets/Tiles/Chinese/i.png`) },
  { image: require(`../../../assets/Tiles/Chinese/j.png`) },
  { image: require(`../../../assets/Tiles/Chinese/k.png`) },

  { image: require(`../../../assets/Tiles/Chinese/m.png`) },
  { image: require(`../../../assets/Tiles/Chinese/one.png`) },
  { image: require(`../../../assets/Tiles/Chinese/p.png`) },
  { image: require(`../../../assets/Tiles/Chinese/qqq.png`) },

  { image: require(`../../../assets/Tiles/Chinese/r.png`) },
  { image: require(`../../../assets/Tiles/Chinese/t.png`) },
  { image: require(`../../../assets/Tiles/Chinese/u.png`) },
  { image: require(`../../../assets/Tiles/Chinese/v.png`) },

  { image: require(`../../../assets/Tiles/Chinese/w.png`) },
  { image: require(`../../../assets/Tiles/Chinese/y.png`) },
  { image: require(`../../../assets/Tiles/Chinese/z.png`) },
];

// FUNCTION TO GENERATE PAIRS OF IMAGE INDEX B/W 1 TO 8
const generateImagePairs = () => {
  const PAIRS_REQ = TILES / 2;
  const numPairs = new Set();

  // Generate random "numPairs"
  while (numPairs.size < PAIRS_REQ) {
    numPairs.add(Math.floor(Math.random() * (CardImages.length - 1)));
    if (numPairs.size === PAIRS_REQ) break;
  }

  // Duplicate the numPairs
  let actualPairs = Array.from(numPairs).flatMap((index) => [
    index + 1,
    index + 1,
  ]);

  // Shuffle the pairs
  for (let i = actualPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [actualPairs[i], actualPairs[j]] = [actualPairs[j], actualPairs[i]];
  }

  // loggin the pairs
  console.log("Pairs are : " + actualPairs);

  return actualPairs; // returning array of shuffled pairs of image objects
};

const MemoGame = (props) => {
  // STATE TO KEEP TRACK OF OPENED AND PAIRED TILES
  const [opened, setOpened] = useState([]);
  const [paired, setPaired] = useState([]);

  // STATE TO KEEP TRACK OF TURNS AND MATCHES
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  // CONSTANTS
  const MATCH_DELAY = useMemo(() => 3000, []);
  const PAIR_SIZE = useMemo(() => 2, []);

  // GENERATE PAIRS
  const [pairs, setPairs] = useState(generateImagePairs());

  // FUNCTION TO HANDLE NEW GAME BUTTON PRESS
  const handleNewGame = useCallback(() => {
    // Set all images to hidden
    setOpened([]);
    setPaired([]);

    //reset turns and matches
    setTurns(0);
    setMatched(0);

    // Generate new pairs
    setPairs(generateImagePairs());
  }, []);

  useEffect(() => {
    handleNewGame();
  }, []);

  //FUNCTION TO HANDLE TURNS AND MATCHES
  const handleTurnNMatches = (isMatched) => {
    setTurns((prevTurns) => prevTurns + 1);

    if (isMatched) {
      setMatched((prevMatched) => prevMatched + 1);
    }

    if (matched === TILES / PAIR_SIZE - 1 && turns % PAIR_SIZE !== 0) {
      ToastAndroid.show("You Won!", ToastAndroid.SHORT);
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, MATCH_DELAY));
        handleNewGame();
      })();
    }
  };

  // FUNCTION TO HANDLE TILE PRESS
  const handleTileClick = async (tileIndex, pairNo) => {
    const CLOSE_DELAY = 800;

    if (opened.includes(tileIndex) || paired.includes(tileIndex)) {
      return;
    }

    // If no tile is opened
    if (opened.length === paired.length) {
      setOpened([tileIndex, ...paired]);
    }

    // If one tile is already opened
    else if (opened.length === paired.length + 1) {
      // If matches the opened tile, add to paired
      if (pairNo === pairs[opened[0]]) {
        setPaired((prevPaired) => [tileIndex, opened[0], ...prevPaired]);
        setOpened((prevOpened) => [tileIndex, opened[0], ...prevOpened]);
        handleTurnNMatches(true);
      }

      // Otherwise, close both the opened tiles after 2.5 sec delay
      else {
        setOpened([tileIndex, ...opened]);
        handleTurnNMatches(false);
        await new Promise((resolve) => setTimeout(resolve, CLOSE_DELAY));
        setOpened((prevOpened) =>
          prevOpened.filter(
            (index) => index !== tileIndex && index !== opened[0]
          )
        );
      }
    }
  };

  return (
    <View style={styles.Container}>
      {/* Title */}
      <Text style={styles.gameHeader}>Memo-Game</Text>

      {/* MemoGame */}
      <View style={styles.tileContainer}>
        {Array(ROWS) // row=2
          .fill()
          .map((_, i) => (
            <View key={i} style={styles.eachLineOfTileContainer}>
              {Array(COLUMNS) // COLUMNS=4
                .fill()
                .map((_, j) => {
                  const tileIndex = COLUMNS * i + j; // COLUMNS=4 * i + j
                  const source = opened.includes(tileIndex)
                    ? CardImages[pairs[tileIndex]].image
                    : CardImages[0].image;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleTileClick(tileIndex, pairs[tileIndex])
                      }
                      key={tileIndex}
                    >
                      <Image
                        source={source}
                        style={[
                          styles.tile,
                          source === CardImages[0].image &&
                            styles.tileClosedStyle,
                        ]}
                        keyValue={pairs[tileIndex]}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          ))}
      </View>

      {/* //New Game Button */}
      <TouchableOpacity
        style={styles.newGameButtonContainer}
        onPress={handleNewGame}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          New Game
        </Text>
      </TouchableOpacity>

      {/* //Score Board */}
      <View style={styles.scoreBoardPosition}>
        <View style={[styles.scoreBoardElem]}>
          <Text style={styles.innerScore}>Turns: </Text>
          <Text
            style={[
              styles.innerScore,
              { fontSize: 55, fontWeight: 800, marginTop: -10 },
            ]}
          >
            {turns}
          </Text>
        </View>
        <View style={[styles.scoreBoardElem]}>
          <Text style={styles.innerScore}>Matches: </Text>
          <Text
            style={[
              styles.innerScore,
              {
                fontSize: 55,
                fontWeight: 800,
                marginTop: -10,
              },
            ]}
          >
            {matched}
          </Text>
        </View>
      </View>
    </View>
  );
};

// STYLESHEET
const commonStyles = {
  commonCentering: {
    alignItems: "center",
    justifyContent: "center",
  },
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    zIndex: -1,
    ...commonStyles.commonCentering,
  },

  tileContainer: {
    position: "absolute",
    backgroundColor: "rgba(100, 100, 100, 0.20)",
    borderColor: "rgba(255, 255, 255, 0.09)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    ...commonStyles.commonCentering,
  },

  gameHeader: {
    textAlign: "center",
    position: "absolute",
    top: 20,

    // font
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "white",
  },

  scoreBoardPosition: {
    position: "absolute",
    right: 18,
    bottom: 5,
    padding: 10,
    flexDirection: "row",
  },

  scoreBoardElem: {
    borderColor: "rgba(232, 175, 255, 0.155)",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    backgroundColor: "rgba(100, 100, 100, 0.20)",
    padding: 5,
  },

  innerScore: {
    textAlign: "center",
    color: "#fcadd8",
  },

  newGameButtonContainer: {
    //styling
    position: "absolute",
    height: 50,
    padding: 10,
    paddingHorizontal: 30,

    //border
    borderRadius: 25,
    borderColor: "#05eeff",
    borderWidth: 2,

    //positiion
    bottom: 15,
    left: 25,
    ...commonStyles.commonCentering,
  },

  tile: {
    width: 60,
    height: 60,
    margin: 8,
  },

  eachLineOfTileContainer: {
    flexDirection: "row",
  },

  tileClosedStyle: {
    tintColor: "#DDD",
    opacity: 1,
  },
});

export default MemoGame;

// #E8AFFF neon purple for bg of opened tiles
