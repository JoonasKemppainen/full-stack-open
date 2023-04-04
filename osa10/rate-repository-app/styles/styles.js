import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 3,
    },
    errorText: {
        paddingLeft: 13,
        color: "#D30303",
    },
    errorInput: {
        borderColor: '#D30303',
    },
    signin: {
        borderRadius: 3,
        margin: 12,
        height: 55,
        backgroundColor: "#0165D4",
        textAlign: "center",
        textAlignVertical: "center"
    }
});

export default styles;