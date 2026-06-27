import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../styles/theme';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function RegisterScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const registerStore = useAuthStore((state) => state.register);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idType, setIdType] = useState<'nin' | 'passport'>('nin');
  const [idValue, setIdValue] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!firstName) tempErrors.firstName = t('common.required');
    if (!lastName) tempErrors.lastName = t('common.required');
    
    if (!email) {
      tempErrors.email = t('common.required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = t('common.invalid_email');
    }
    
    if (!password) {
      tempErrors.password = t('common.required');
    }
    
    if (!idValue) {
      tempErrors.idValue = t('common.required');
    } else if (idType === 'nin' && idValue.length !== 18) {
      tempErrors.idValue = t('auth.invalid_nin');
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await authApi.register({
        firstName,
        lastName,
        email,
        password,
        nationalId: idType === 'nin' ? idValue : undefined,
        passportNumber: idType === 'passport' ? idValue : undefined,
      });
      const accessToken = response.access ?? response.accessToken ?? response.token ?? '';
      registerStore(response.user, accessToken);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed.';
      Alert.alert(t('auth.register_title'), message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('auth.register_title')}</Text>
        <Text style={styles.subtitle}>{t('auth.register_subtitle')}</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('auth.first_name')}
          placeholder="Youcef"
          value={firstName}
          onChangeText={setFirstName}
          error={errors.firstName}
        />

        <Input
          label={t('auth.last_name')}
          placeholder="Benali"
          value={lastName}
          onChangeText={setLastName}
          error={errors.lastName}
        />

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

        {/* Identification Document Toggle Selector */}
        <View style={styles.idSelectorContainer}>
          <Text style={[styles.idSelectorLabel, { textAlign: isRtl ? 'right' : 'left' }]}>
            {t('complaints.doc_type')}
          </Text>
          <View style={[styles.tabBar, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity
              style={[styles.tab, idType === 'nin' && styles.activeTab]}
              onPress={() => { setIdType('nin'); setIdValue(''); }}
            >
              <Text style={[styles.tabText, idType === 'nin' && styles.activeTabText]}>
                {t('auth.id_type_nin')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, idType === 'passport' && styles.activeTab]}
              onPress={() => { setIdType('passport'); setIdValue(''); }}
            >
              <Text style={[styles.tabText, idType === 'passport' && styles.activeTabText]}>
                {t('auth.id_type_passport')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Input
          label={idType === 'nin' ? t('auth.national_id') : t('auth.passport_number')}
          placeholder={idType === 'nin' ? "102938475610293847" : "123456789"}
          value={idValue}
          onChangeText={setIdValue}
          error={errors.idValue}
          keyboardType={idType === 'nin' ? 'numeric' : 'default'}
          maxLength={idType === 'nin' ? 18 : 20}
        />

        <Button
          title={t('auth.register_btn')}
          onPress={handleRegister}
          loading={loading}
          style={styles.button}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text style={[styles.loginText, { textAlign: isRtl ? 'right' : 'left' }]}>
            {t('auth.already_have_account')}
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
    padding: theme.spacing.lg,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
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
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  idSelectorContainer: {
    marginBottom: theme.spacing.md,
  },
  idSelectorLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  tabBar: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.md,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.medium,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  button: {
    marginTop: theme.spacing.md,
  },
  loginLink: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  loginText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
});
