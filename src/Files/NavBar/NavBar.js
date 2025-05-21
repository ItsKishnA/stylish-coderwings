import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import soundIcon from "../../../assets/icons/audio-waves.png";
import memoGameIcon from "../../../assets/icons/MemoGameIcon-WithoutBG.png";
import musicIcon from "../../../assets/icons/music.png";
import settingIcon from "../../../assets/icons/setting.png";
import simonSaysIcon from "../../../assets/icons/SimonSaysLogo.png";
import profileIcon from "../../../assets/icons/user.png";
// import { icons } from "../../Constants/icons"; // TODO

const MUSIC = false; // TODO

const NavBar = (props) => {
  const [currentTab, setCurrentTab] = useState(props.currentTab);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);

  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  const [musicObject, setMusicObject] = useState(null);
  const [soundObject, setSoundObject] = useState(null);

  useEffect(() => {
    const loadMusic = async () => {
      const _musicObject = new Audio.Sound();
      await _musicObject.loadAsync(
        require("../../../assets/sounds/Automation.mp3")
      );
      setMusicObject(_musicObject);
      await _musicObject.setVolumeAsync(0.4);
      if (MUSIC) {
        await _musicObject.setIsLoopingAsync(true); // TODO
        await _musicObject.playAsync(); // TODO
      }
    };

    const loadSound = async () => {
      const _soundObject = new Audio.Sound();
      await _soundObject.loadAsync(
        require("../../../assets/sounds/onClick.wav")
      );
      setSoundObject(_soundObject);
      // await _soundObject.setVolumeAsync(0.4);
    };

    loadSound();
    loadMusic();
  }, []);

  const playMusic = async () => {
    try {
      //if music is already being played, then return
      if (isPlayingMusic) return;
      else {
        await musicObject?.playAsync(); // setting music on
        setIsPlayingMusic(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pauseMusic = async () => {
    try {
      if (!isPlayingMusic) return;
      else {
        await musicObject.pauseAsync();
        setIsPlayingMusic(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const title = ["MemoGame", "SimonSays"];

  const handleClick = async (id, tab) => {
    if (sound) {
      try {
        await soundObject.replayAsync();
      } catch (error) {
        console.log(error);
      }
    }
    if (id >= 4) {
      if (currentTab === title[id - 4]) return;
      else {
        setCurrentTab(title[id - 4]);
        props.onTabChange(title[id - 4]);
      }
      return;
    } else {
      if (id === 0) {
        console.log("Profile");
      } else if (id === 1) {
        props.onSoundDisabling(!sound);
        setSound(!sound);
      } else if (id === 2) {
        if (music && isPlayingMusic) {
          await pauseMusic();
        } else {
          await playMusic();
        }
        setMusic(!music);
      } else if (id === 3) {
        console.log("Settings");
      }
    }
  };

  const NavElement = ({
    source,
    text,
    fontSize = 18,
    padding = 10,
    paddingRight = 20,
    id,
    element = false,
    style = {},
    size = 35,
  }) => (
    <TouchableOpacity
      style={[styles.navElem, style]}
      onPress={() => handleClick(id, element)}
    >
      <Image
        source={source}
        style={[styles.icon, { height: size, width: size }]}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize, padding, paddingRight, color: "darkgray" }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navBar}>
      {/* Profile // TODO */}
      <NavElement id={0} source={profileIcon} text="Profile" />

      {/* Navbar Elements*/}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <NavElement
          element={true}
          id={4}
          source={memoGameIcon}
          size={110}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: "rgba(100, 100, 100, 0.25)",
            // : "transparent",
            // borderColor: currentTab === title[0] ? null : "white",
            // borderWidth: currentTab === title[0] ? 0 : 1,
            // width: 100,
          }}
        />
        <NavElement
          element={true}
          id={5}
          source={simonSaysIcon}
          size={110}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: "rgba(100, 100, 100, 0.25)",
            // currentTab === title[1]
            // ?
            // : "transparent",
            // borderColor: currentTab === title[1] ? null : "white",
            // borderWidth: currentTab === title[1] ? 0 : 1,
            // width: 100,
          }}
        />
      </View>
      {/* Sound & Music */}
      <View style={{ flexDirection: "row" }}>
        <NavElement
          id={1}
          source={soundIcon}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: sound
              ? "rgba(100, 100, 100, 0.25)"
              : "transparent",
          }}
        />
        <NavElement
          id={2}
          source={musicIcon}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: music
              ? "rgba(100, 100, 100, 0.25)"
              : "transparent",
          }}
        />
      </View>
      {/* Settings */}
      <NavElement id={3} source={settingIcon} text="Settings" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    // backgroundColor: "white",
    // borderRadius: 8,
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },

  navElem: {
    alignSelf: "baseline",
    flexDirection: "row",
    backgroundColor: "rgba(100, 100, 100, 0.25)",
    borderRadius: 25,
    padding: 10,
    margin: 10,
    paddingRight: 10,
  },

  navBar: {
    backgroundColor: "transparent",
    flex: 1,
    padding: 10,
    margin: 10,
    paddingBottom: 30,
  },
});

export default NavBar;
