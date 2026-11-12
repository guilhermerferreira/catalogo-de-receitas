import { Text, TextInput, StyleSheet } from "react-native";

/**
 * @param {import('react-native').TextInputProps} props
 */
export default function Input({error, ...props}) {
    return (
        <>
            <TextInput style={styles.input} {...props}/>
            {error ? <Text style={styles.errorText}> {error} </Text> : null}
        </>
        
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
    },
    errorText: {
        color: '#e53935',
        fontSize: 12,
        marginTop: -10, // -10, porque o input da um marginBottom de 10
        marginLeft: 3
    }
});