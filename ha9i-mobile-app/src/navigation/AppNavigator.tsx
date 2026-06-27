import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/useAuthStore';

// Import Screens
import SplashScreen from '../screens/SplashScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import TabNavigator from './TabNavigator';
import LegalAssistantScreen from '../screens/LegalAssistant/LegalAssistantScreen';
import ComplaintFormScreen from '../screens/ElectronicComplaint/ComplaintFormScreen';
import ProcedureScannerScreen from '../screens/ProcedureScanner/ProcedureScannerScreen';

export type RootStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  LegalAssistant: undefined;
  ComplaintForm: undefined;
  ProcedureScanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="LegalAssistant" component={LegalAssistantScreen} />
          <Stack.Screen name="ComplaintForm" component={ComplaintFormScreen} />
          <Stack.Screen name="ProcedureScanner" component={ProcedureScannerScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
