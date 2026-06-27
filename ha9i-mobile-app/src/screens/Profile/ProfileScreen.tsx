import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useComplaintStore } from '../../store/useComplaintStore';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { isRtl, language, setLanguage } = useLanguageStore();
  const { user, logout } = useAuthStore();
  const complaints = useComplaintStore((state) => state.complaints);

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'fr' : language === 'fr' ? 'en' : 'ar';
    const requiresReload = setLanguage(nextLang);
    if (requiresReload) {
      Alert.alert('Language Updated', 'تم تغيير اتجاه اللغة. قد يتطلب إعادة تشغيل التطبيق في بعض البيئات لتحديث التخطيط بالكامل.');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Header title={t('profile.title')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <Card style={styles.userCard}>
          <View style={[styles.avatarRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.firstName ? user.firstName[0].toUpperCase() : 'C'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { textAlign: isRtl ? 'right' : 'left' }]}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={[styles.userEmail, { textAlign: isRtl ? 'right' : 'left' }]}>
                {user?.email}
              </Text>
            </View>
          </View>
        </Card>

        {/* Account Info Section */}
        <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
          {t('profile.personal_info')}
        </Text>
        <Card>
          <View style={[styles.infoItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <Text style={styles.infoLabel}>{t('auth.first_name')}</Text>
            <Text style={styles.infoValue}>{user?.firstName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infoItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <Text style={styles.infoLabel}>{t('auth.last_name')}</Text>
            <Text style={styles.infoValue}>{user?.lastName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.infoItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <Text style={styles.infoLabel}>{user?.nationalId ? t('auth.national_id') : t('auth.passport_number')}</Text>
            <Text style={styles.infoValue}>{user?.nationalId || user?.passportNumber || 'N/A'}</Text>
          </View>
        </Card>

        {/* App Settings Section */}
        <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
          الإعدادات / Paramètres
        </Text>
        <Card>
          <TouchableOpacity
            style={[styles.settingItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
            onPress={toggleLanguage}
            activeOpacity={0.7}
          >
            <View style={[styles.settingLeft, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Ionicons name="language-outline" size={20} color={theme.colors.secondary} />
              <Text style={[styles.settingLabel, { marginHorizontal: 8 }]}>
                {t('profile.settings_language')}
              </Text>
            </View>
            <View style={[styles.settingRight, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Text style={styles.langValue}>
                {language === 'ar' ? 'العربية' : language === 'fr' ? 'Français' : 'English'}
              </Text>
              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward'}
                size={16}
                color={theme.colors.textMuted}
              />
            </View>
          </TouchableOpacity>
        </Card>

        {/* Complaint History Shortcut */}
        <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
          {t('profile.complaint_history')}
        </Text>
        <Card>
          <View style={[styles.infoItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <Text style={styles.infoLabel}>إجمالي الشكاوى المودعة</Text>
            <Text style={styles.infoValue}>{complaints.length}</Text>
          </View>
        </Card>

        {/* Logout Button */}
        <Button
          title={t('common.logout')}
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutBtn}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    marginTop: theme.spacing.sm,
  },
  avatarRow: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  avatarText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  userDetails: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  userName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  userEmail: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    paddingHorizontal: 4,
  },
  infoItem: {
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
  },
  infoValue: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  settingItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  settingLeft: {
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
  },
  settingRight: {
    alignItems: 'center',
    gap: 4,
  },
  langValue: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  logoutBtn: {
    marginTop: theme.spacing.xl,
  },
});
