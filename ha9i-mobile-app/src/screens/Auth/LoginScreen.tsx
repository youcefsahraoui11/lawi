import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../styles/theme';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!email) {
      tempErrors.email = t('common.required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = t('common.invalid_email');
    }
    if (!password) {
      tempErrors.password = t('common.required');
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const accessToken = response.access ?? response.accessToken ?? response.token ?? '';
      loginStore(response.user.email, accessToken, response.user);
      // Main redirection is handled globally by Zustand auth state check in AppNavigator
    } catch (err) {
      const message = err instanceof Error ? err.message : t('auth.login_failed') || 'Invalid credentials';
      Alert.alert(t('auth.login_title'), message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.seal}>
          <Text style={styles.sealText}>HA9I</Text>
        </View>
        <Text style={styles.title}>{t('auth.login_title')}</Text>
        <Text style={styles.subtitle}>{t('auth.login_subtitle')}</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('common.email')}
          placeholder="citizen@mail.dz"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label={t('common.password')}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          title={t('auth.login_btn')}
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.signupLink}
        >
          <Text style={[styles.signupText, { textAlign: isRtl ? 'right' : 'left' }]}>
            {t('auth.dont_have_account')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  seal: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: '#FFFFFF',
  },
  sealText: {
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.md,
  },
  signupLink: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  signupText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
});
