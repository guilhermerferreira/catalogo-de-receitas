import { Text, View, StyleSheet } from "react-native";

export default function TelaHome() {
    return (
        <View style={styles.container}>
            <Text>Tela Home!</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});