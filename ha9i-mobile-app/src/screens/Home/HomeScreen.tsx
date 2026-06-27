import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { theme } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const { user } = useAuthStore();

  const services = [
    {
      id: 'assistant',
      title: t('home.service_assistant'),
      icon: 'chatbubble-ellipses',
      screen: 'LegalAssistant',
      color: theme.colors.primary,
    },
    {
      id: 'lawyers',
      title: t('home.service_lawyers'),
      icon: 'people',
      screen: 'Lawyers', // Tab
      isTab: true,
      color: theme.colors.secondary,
    },
    {
      id: 'complaints',
      title: t('home.service_complaints'),
      icon: 'document-text',
      screen: 'ComplaintForm',
      color: theme.colors.primary,
    },
    {
      id: 'resources',
      title: t('home.service_resources'),
      icon: 'library',
      screen: 'Resources', // Tab
      isTab: true,
      color: theme.colors.secondary,
    },
    {
      id: 'scanner',
      title: t('home.service_scanner'),
      icon: 'scan',
      screen: 'ProcedureScanner',
      color: theme.colors.primary,
    },
  ];

  const handleServicePress = (service: typeof services[0]) => {
    if (service.isTab) {
      navigation.navigate(service.screen);
    } else {
      navigation.navigate(service.screen);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Government Badge Header */}
      <View style={[styles.govHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View style={styles.badge} />
        <View style={styles.govTextContainer}>
          <Text style={[styles.govTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
            الجمهورية الجزائرية الديمقراطية الشعبية
          </Text>
          <Text style={[styles.govSub, { textAlign: isRtl ? 'right' : 'left' }]}>
            وزارة العدل - البوابة القانونية للمواطن
          </Text>
        </View>
      </View>

      {/* Welcome Banner */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { textAlign: isRtl ? 'right' : 'left' }]}>
          {t('home.welcome')}
        </Text>
        <Text style={[styles.userName, { textAlign: isRtl ? 'right' : 'left' }]}>
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      {/* Services Grid */}
      <View style={styles.servicesGrid}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              { flexDirection: isRtl ? 'row-reverse' : 'row' },
            ]}
            onPress={() => handleServicePress(service)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconWrapper, { backgroundColor: `${service.color}15` }]}>
              <Ionicons name={service.icon as any} size={24} color={service.color} />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.serviceTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
                {service.title}
              </Text>
              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward'}
                size={16}
                color={theme.colors.textMuted}
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notice Board */}
      <Card style={styles.noticeCard}>
        <View style={[styles.noticeHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
          <Text style={[styles.noticeTitle, { marginRight: isRtl ? 8 : 0, marginLeft: isRtl ? 0 : 8 }]}>
            تنبيه قانوني هام
          </Text>
        </View>
        <Text style={[styles.noticeText, { textAlign: isRtl ? 'right' : 'left' }]}>
          تم إطلاق خدمة إيداع الشكاوى الإلكترونية رسمياً لتسهيل المتابعة القانونية للمواطنين دون الحاجة للتنقل للمقار القضائية. يرجى توخي الدقة في ملء البيانات لتفادي الرفض.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingTop: 50,
  },
  govHeader: {
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    marginHorizontal: theme.spacing.sm,
  },
  govTextContainer: {
    flex: 1,
  },
  govTitle: {
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  govSub: {
    fontSize: 8,
    color: theme.colors.textMuted,
  },
  welcomeSection: {
    marginBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
  },
  userName: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    marginTop: 2,
  },
  servicesGrid: {
    marginBottom: theme.spacing.lg,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.roundness.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: theme.roundness.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  serviceTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    flex: 1,
  },
  arrow: {
    alignSelf: 'center',
  },
  noticeCard: {
    backgroundColor: 'rgba(11, 94, 215, 0.03)',
    borderColor: 'rgba(11, 94, 215, 0.15)',
  },
  noticeHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  noticeTitle: {
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
  },
  noticeText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text,
    lineHeight: 18,
  },
});
