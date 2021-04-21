import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import loadAnimation from "../assets/load.json";

// import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
