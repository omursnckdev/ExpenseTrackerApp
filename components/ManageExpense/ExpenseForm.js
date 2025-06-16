import {View,Text, StyleSheet, Alert} from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../../UI/Button';
import { getFormattedDate } from '../../Util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues }) {

   const [inputs, setInputValues] = useState({
    amount:{ value: defaultValues ? defaultValues.amount.toString() : '' , isValid: true,},
    date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true,},
    description:{value: defaultValues ? defaultValues.description : '', isValid: true,},
   });
        

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputs) => {
            return {
                 ...curInputs,
                  [inputIdentifier]: {value: enteredValue, isValid: true},
                 };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {

            Alert.alert(
                'Invalid input',
                'Please check your entered data.' );
                setInputValues((curInputs)=> {
                    return {
                        amount: { value: curInputs.amount.value, isValid: amountIsValid },
                        date: { value: curInputs.date.value, isValid: dateIsValid },
                        description: { value: curInputs.description.value, isValid: descriptionIsValid },
                    };
                });
            return;
        }

        onSubmit(expenseData);
       
    }

    const formIsInvalid = 
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

    return (
        <View  style= {styles.form}>  
        <Text style = {styles.title}>Expense Details</Text>
            <View style = {styles.inputRow}>  
                <Input style= {styles.rowInput} 
                label={'Amount'}
                inValid = {!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }}/>
                <Input   style= {styles.rowInput}
                label={'Date'}
                inValid = {!inputs.amount.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}/>
            </View>
                <Input label={'Description'}  
                 inValid = {!inputs.amount.isValid}
                 textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: 'sentences',
                    maxLength: 200,
                    placeholder: 'Description of the expense',
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}/>
          {formIsInvalid &&  ( <Text style = {styles.errorText}> Invalid input values - please check your entered data! </Text> )}
            <View style = {styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                    </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    form: {
        marginTop: 40,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        margin:12,
    }
});