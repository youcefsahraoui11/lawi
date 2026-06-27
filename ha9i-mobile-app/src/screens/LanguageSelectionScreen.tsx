import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/useLanguageStore';
import { theme } from '../styles/theme';
import Button from '../components/Button';

import { useAuthStore } from '../store/useAuthStore';

export default function LanguageSelectionScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);
    if (isAuthenticated) {
      navigation.replace('Main');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>اختر اللغة / Choisir la langue</Text>
        <Text style={styles.subtitle}>Select your language to proceed</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.langCard, language === 'ar' && styles.selectedCard]}
          onPress={() => handleSelectLanguage('ar')}
          activeOpacity={0.8}
        >
          <Text style={styles.langName}>العربية</Text>
          <Text style={styles.langSubtitle}>arabe (Par défaut / RTL)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.langCard, language === 'fr' && styles.selectedCard]}
          onPress={() => handleSelectLanguage('fr')}
          activeOpacity={0.8}
        >
          <Text style={styles.langName}>Français</Text>
          <Text style={styles.langSubtitle}>français (LTR)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.langCard, language === 'en' && styles.selectedCard]}
          onPress={() => handleSelectLanguage('en')}
          activeOpacity={0.8}
        >
          <Text style={styles.langName}>English</Text>
          <Text style={styles.langSubtitle}>english (LTR)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  langCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(11, 94, 215, 0.04)',
  },
  langName: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  langSubtitle: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
});
