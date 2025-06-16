import { useContext, useLayoutEffect , useState} from "react";
import { Text,View, StyleSheet} from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense , deleteExpense} from "../Util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay
 from "../UI/ErrorOverlay";
function ManageExpenses({route, navigation}) {

 const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState();

const expenseCtx = useContext(ExpensesContext);

const editedExpenseId = route.params?.expenseId;
const isEditing = !!editedExpenseId;
const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);

useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: isEditing ? 'Edit Expense' : 'Add Expense',
    });
}, [navigation, isEditing]);


    async function deleteExpenseHandler() {
        
        setIsSubmitting(true);
        try{
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }catch(error) {
            setError('Could not delete expense - please try again later!');
            setIsSubmitting(false);  
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try{
            if (isEditing){
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId ,expenseData);
            }else{
               const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();

        }catch(error){
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
      
    }

    

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error}  />;
    }

    if(isSubmitting){
        return <LoadingOverlay/>
    }
    return(

         <View style = {styles.container}>
            <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} 
             onSubmit={confirmHandler}
             onCancel={cancelHandler}
             defaultValues={selectedExpense}
             />

        {isEditing && (
        <View style = {styles.deleteContainer}>
        <IconButton 
        icon="trash" 
        color={GlobalStyles.colors.error500}
        size={36} 
        onPress={deleteExpenseHandler} />
        </View>
        )}
    </View>
    );
}
export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
       marginTop: 16,
       paddingTop: 8,
         borderTopWidth: 2,
         borderTopColor: GlobalStyles.colors.primary200,
         alignItems: 'center',

    },
   
});