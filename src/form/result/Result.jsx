import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { styles } from "./style";

export const Result = ({ result, resultMsg }) => {
  const onShare = async () => {
    const result = await Share.share({
      message: `Meu imc hoje é ${result}`,
    });
  };

  return (
    <View style={styles.resultImc}>
      <Text style={styles.numberImc}>{result}</Text>
      <Text style={styles.informate}>{resultMsg}</Text>
      <View style={styles.boxShareButton}>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
