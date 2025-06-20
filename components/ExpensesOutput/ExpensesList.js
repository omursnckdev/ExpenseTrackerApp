import { FlatList, Text, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({expenses}){
    return <FlatList
     data={expenses} 
    renderItem={renderExpenseItem}
     keyExtractor={(item) => item.id}/>;
}

export default ExpensesList;

const styles = StyleSheet.create({
    list: {
        marginTop: 24,
    },
    fallbackText: {
        textAlign: "center",
        color: "#ccc",
    },
});
