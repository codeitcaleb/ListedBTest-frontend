import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Activities from './src/screens/Activities';
import ActivityPage from './src/screens/ActivityPage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Activities"
            component={Activities}
            animationEnabled={true}
            gestureEnabled={true}
         />

        <Stack.Screen
            name="ActivityPage"
            component={ActivityPage}
            animationEnabled={true}
            gestureEnabled={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
