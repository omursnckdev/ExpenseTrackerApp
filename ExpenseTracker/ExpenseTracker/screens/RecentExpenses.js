import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../Util/date";
import { fetchExpenses } from "../Util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";


function RecentExpenses() {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);    

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expensesData = await fetchExpenses();
    
                const expenses = [];
    
                for (const key in expensesData) {
                    const expenseObj = {
                        id: key,
                        amount: expensesData[key].amount,
                        date: new Date(expensesData[key].date),
                        description: expensesData[key].description,
                    };
                    expenses.push(expenseObj);
                }
    
                expensesCtx.setExpense(expenses); // <-- Moved here
    
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
    
        getExpenses();
    }, []);
    



if(error && !isFetching) {
    return <ErrorOverlay message={error} />;
}

if(isFetching) {
    return <LoadingOverlay />
}
     
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        
        return (expense.date >= date7daysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput 
    expenses={recentExpenses} 
    expensesPeriod="Last 7 Days" 
    fallbackText="No expenses registered for the last 7 days."/>
}
export default RecentExpenses;