import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';

export default function ProcedureScannerScreen() {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();

  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<boolean>(false);

  const triggerScan = () => {
    setScanning(true);
    setResult(false);
    
    // Simulate scan delay (presentation mock)
    setTimeout(() => {
      setScanning(false);
      setResult(true);
    }, 2000);
  };

  const handleReset = () => {
    setResult(false);
  };

  return (
    <View style={styles.container}>
      <Header title={t('scanner.title')} showBackButton />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!scanning && !result && (
          <View style={styles.uploadArea}>
            <Ionicons name="document-attach-outline" size={64} color={theme.colors.primary} />
            <Text style={styles.instructions}>{t('scanner.instructions')}</Text>
            
            <View style={styles.actionsContainer}>
              <Button
                title={t('scanner.take_photo_btn')}
                onPress={triggerScan}
                style={styles.actionBtn}
              />
              <Button
                title={t('scanner.upload_btn')}
                onPress={triggerScan}
                variant="secondary"
                style={styles.uploadBtn}
              />
            </View>
          </View>
        )}

        {scanning && (
          <View style={styles.scanningContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.scanningText}>{t('scanner.scanning')}</Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
              <Text style={[styles.resultTitleText, { marginHorizontal: 8 }]}>
                {t('scanner.result_title')}
              </Text>
            </View>
            
            <Card style={styles.docInfoCard}>
              <Text style={[styles.docLabel, { textAlign: isRtl ? 'right' : 'left' }]}>
                المستند المكتشف / Document Détecté :
              </Text>
              <Text style={[styles.docName, { textAlign: isRtl ? 'right' : 'left' }]}>
                {t('scanner.example_birth_cert')} (Acte de naissance N° 12)
              </Text>
            </Card>

            {/* List of Procedures */}
            <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t('scanner.required_procedures')}
            </Text>
            <Card>
              <View style={styles.procedureItem}>
                <Text style={[styles.procNumber, { textAlign: isRtl ? 'right' : 'left' }]}>1. طلب بطاقة التعريف الوطنية البيومترية</Text>
                <Text style={[styles.procDesc, { textAlign: isRtl ? 'right' : 'left' }]}>
                  تتطلب شهادة الميلاد رقم 12 كوثيقة إجبارية لإيداع ملف طلب الهوية البيومترية.
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.procedureItem}>
                <Text style={[styles.procNumber, { textAlign: isRtl ? 'right' : 'left' }]}>2. تجديد جواز السفر البيومتري</Text>
                <Text style={[styles.procDesc, { textAlign: isRtl ? 'right' : 'left' }]}>
                  تستعمل كإثبات للحالة المدنية عند تقديم الطلب عبر البوابة الرقمية لوزارة الداخلية.
                </Text>
              </View>
            </Card>

            {/* List of Offices */}
            <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t('scanner.required_offices')}
            </Text>
            <Card>
              <Text style={[styles.officeItem, { textAlign: isRtl ? 'right' : 'left' }]}>• بلدية المقر (Commune de résidence)</Text>
              <Text style={[styles.officeItem, { textAlign: isRtl ? 'right' : 'left' }]}>• الدائرة الإدارية / المقاطعة (Daïra)</Text>
            </Card>

            {/* List of Documents */}
            <Text style={[styles.sectionTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t('scanner.required_documents')}
            </Text>
            <Card>
              <Text style={[styles.officeItem, { textAlign: isRtl ? 'right' : 'left' }]}>• عقد ميلاد أصلي للمكلف</Text>
              <Text style={[styles.officeItem, { textAlign: isRtl ? 'right' : 'left' }]}>• بطاقة فصيلة الدم</Text>
              <Text style={[styles.officeItem, { textAlign: isRtl ? 'right' : 'left' }]}>• شهادة الإقامة الحالية</Text>
            </Card>

            <Button
              title="مسح مستند آخر / Scanner un autre"
              onPress={handleReset}
              variant="secondary"
              style={styles.resetBtn}
            />
          </View>
        )}
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  uploadArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: theme.roundness.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  instructions: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginVertical: theme.spacing.lg,
    lineHeight: 20,
  },
  actionsContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
  uploadBtn: {
    width: '100%',
    marginTop: theme.spacing.sm,
  },
  scanningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  scanningText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
  resultContainer: {
    flex: 1,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  resultTitleText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  docInfoCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  docLabel: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  docName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  procedureItem: {
    paddingVertical: theme.spacing.xs,
  },
  procNumber: {
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
  },
  procDesc: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  officeItem: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text,
    marginBottom: 4,
  },
  resetBtn: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
