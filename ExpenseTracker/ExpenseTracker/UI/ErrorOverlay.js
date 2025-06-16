import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Button from "./Button";


    function ErrorOverlay({message}) {
        return (
         <View style = {styles.container}>
               <Text style ={[styles.text, styles.title]}>An error occured!</Text>
               <Text style = {styles.text}>{message}</Text>
         </View>
        );
    }
    export default  ErrorOverlay;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: GlobalStyles.colors.primary700,
            padding: 24,
        },
        text: {
            marginBottom: 8,
            textAlign: 'center',
            color : 'white',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
         },
       

    });