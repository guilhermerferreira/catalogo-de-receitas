import { Text, StyleSheet } from 'react-native';

export default function Label({texto}) {
    return (
        <Text style={styles.label}>{ texto }</Text>
    )
}
const styles = StyleSheet.create({
    label: {
        width: '100%',
        marginTop: 6,
        marginBottom: 4,
        color: '#0C343E'
    }
})