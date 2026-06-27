import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import { useAuthStore } from '../store/useAuthStore';

export default function SplashScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main');
      } else {
        navigation.replace('LanguageSelection');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Simple national seal shape to look official */}
        <View style={styles.seal}>
          <Text style={styles.sealText}>الجمهورية الجزائرية</Text>
          <View style={styles.sealLine} />
          <Text style={styles.sealTextEn}>HA9I</Text>
        </View>
        <Text style={styles.title}>حقي</Text>
        <Text style={styles.subtitle}>HA9I</Text>
        <Text style={styles.tagline}>{t('common.app_subtitle')}</Text>
      </View>
      <ActivityIndicator size="small" color={theme.colors.primary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  seal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.sm,
  },
  sealText: {
    fontSize: 9,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  sealLine: {
    height: 1,
    width: '80%',
    backgroundColor: theme.colors.primary,
    marginVertical: 4,
  },
  sealTextEn: {
    fontSize: 14,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  title: {
    fontSize: 40,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
    marginTop: -4,
  },
  tagline: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
  loader: {
    position: 'absolute',
    bottom: 60,
  },
});
