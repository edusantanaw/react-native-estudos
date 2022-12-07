import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Vibration,
  Pressable,
  Keyboard,
} from "react-native";
import { Result } from "./result/Result";
import { styles } from "./style";

const Main = () => {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [result, setResult] = useState(null);
  const [resultMsg, setResultMsg] = useState("Preencha o peso e altura");
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(false);

  function handleCalc() {
    let heightFormat = height.replace(",", ".");
    let weightFormat = weight.replace(",", ".");
    const result = weightFormat / (heightFormat * heightFormat);
    setResult(result.toFixed(2));
  }

  function verificationImc() {
    if (result === null) {
      Vibration.vibrate(150);
      setErrorMessage("campo obrigatorio");
    }
  }

  function validationImc() {
    if (weight != null && height != null) {
      handleCalc();
      setHeight(null);
      setWeight(null);
      setErrorMessage(null);
      setResultMsg("seu imc é igual:");
      setTextButton("Calcular novamente");
    } else {
      verificationImc();
      setResult(null);
      setTextButton("Calcular");
      setResultMsg("preencha o peso e altura");
    }
  }
  return (
    <View style={styles.formContext}>
      {result === null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ex. 175"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ex. 75.254"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <> 
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
          <Result result={result} resultMsg={resultMsg} />
        </>
      )}
    </View>
  );
};

export default Main;
