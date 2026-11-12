import { TextInput, StyleSheet } from "react-native";

/**
 * @param {import('react-native').TextInputProps} props
 */
export default function Input({...props}) {
    return (
        <TextInput style={styles.input} {...props}/>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#FFFBF3',
        borderWidth: 1,
        borderColor: '#E5E0D0',
        borderRadius: 8,
        padding: 9,
        paddingHorizontal: 4,
        fontSize: 14,
        marginBottom: 10
    }
});