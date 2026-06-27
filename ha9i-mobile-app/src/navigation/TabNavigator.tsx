import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/useLanguageStore';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

// Import Screens (to be created)
import HomeScreen from '../screens/Home/HomeScreen';
import LawyersDirectoryScreen from '../screens/LawyersDirectory/LawyersDirectoryScreen';
import ComplaintTrackingScreen from '../screens/ElectronicComplaint/ComplaintTrackingScreen';
import LegalResourcesScreen from '../screens/LegalResources/LegalResourcesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lawyers') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Complaints') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          // Shift tabs visual layout if RTL
          flexDirection: isRtl ? 'row-reverse' : 'row',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('home.service_assistant') }}
      />
      <Tab.Screen
        name="Lawyers"
        component={LawyersDirectoryScreen}
        options={{ title: t('lawyers.title') }}
      />
      <Tab.Screen
        name="Complaints"
        component={ComplaintTrackingScreen}
        options={{ title: t('complaints.tracking_title') }}
      />
      <Tab.Screen
        name="Resources"
        component={LegalResourcesScreen}
        options={{ title: t('resources.title') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('profile.title') }}
      />
    </Tab.Navigator>
  );
}
