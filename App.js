import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { StyleSheet } from 'react-native';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <Ionicons 
          name="add" 
          size={24} 
          color={tintColor} 
          onPress={() => {
            navigation.navigate('ManageExpenses');
          }} 
        />
      ),
    })}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" size={size} color={color} />
        ),
      }}/>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" size={size} color={color} />
        ),
      }}/>
    </BottomTabs.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
        // contentStyle: { backgroundColor: GlobalStyles.colors.primary50 },
        }}>
          <Stack.Screen 
          name="ExpensesOverview" 
          component={ExpensesOverview}  
          options={{ headerShown: false }}/>

          <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
            presentation: 'modal',
          }}/>
        </Stack.Navigator>
        </NavigationContainer>
        </ExpensesContextProvider>   
      </>
  );
}

