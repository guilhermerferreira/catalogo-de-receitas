import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TelaHome() {

const { usuario } = useContext(AuthContext);

  return (
        <View style={styles.container}>
            <Text>Tela Home!</Text>
            <Text>{ usuario?.nome }</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});