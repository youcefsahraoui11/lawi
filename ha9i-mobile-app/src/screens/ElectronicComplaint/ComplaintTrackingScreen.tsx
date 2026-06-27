import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useComplaintStore, ComplaintStatus, Complaint } from '../../store/useComplaintStore';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';

export default function ComplaintTrackingScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const complaints = useComplaintStore((state) => state.complaints);

  const getStatusDetails = (status: ComplaintStatus) => {
    switch (status) {
      case 'submitted':
        return { label: t('complaints.status_submitted'), color: theme.colors.primary, step: 0 };
      case 'under_verification':
        return { label: t('complaints.status_under_verification'), color: theme.colors.warning, step: 1 };
      case 'under_review':
        return { label: t('complaints.status_under_review'), color: theme.colors.warning, step: 2 };
      case 'accepted':
        return { label: t('complaints.status_accepted'), color: theme.colors.success, step: 3 };
      case 'contact_citizen':
        return { label: t('complaints.status_contact_citizen'), color: theme.colors.success, step: 3 };
      case 'rejected':
        return { label: t('complaints.status_rejected'), color: theme.colors.danger, step: 3 };
      default:
        return { label: status, color: theme.colors.textMuted, step: 0 };
    }
  };

  const renderStepper = (currentStep: number, isRejected: boolean) => {
    const steps = [0, 1, 2, 3];
    return (
      <View style={[styles.stepperContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        {steps.map((step, idx) => {
          const isCompleted = step <= currentStep;
          const isLast = idx === steps.length - 1;
          
          let circleColor = theme.colors.border;
          if (isCompleted) {
            circleColor = isRejected && step === 3 ? theme.colors.danger : theme.colors.primary;
          }

          return (
            <React.Fragment key={step}>
              <View style={[styles.stepCircle, { backgroundColor: circleColor }]}>
                {isCompleted && (
                  <Ionicons
                    name={isRejected && step === 3 ? 'close' : 'checkmark'}
                    size={12}
                    color="#FFFFFF"
                  />
                )}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.stepLine,
                    {
                      backgroundColor:
                        step < currentStep
                          ? (isRejected && step === 2 ? theme.colors.danger : theme.colors.primary)
                          : theme.colors.border,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('complaints.tracking_title')} />

      {/* Submit Button Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.newBtn, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
          onPress={() => navigation.navigate('ComplaintForm')}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={20} color="#FFFFFF" />
          <Text style={[styles.newBtnText, { marginRight: isRtl ? 8 : 0, marginLeft: isRtl ? 0 : 8 }]}>
            {t('complaints.new_complaint')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Submitted Complaints */}
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const statusInfo = getStatusDetails(item.status);
          const isRejected = item.status === 'rejected';

          return (
            <Card style={styles.complaintCard}>
              <View style={[styles.cardHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
                <Text style={styles.complaintId}>{item.id}</Text>
                <Text style={styles.submissionDate}>{item.submissionDate}</Text>
              </View>
              
              <Text style={[styles.complainantName, { textAlign: isRtl ? 'right' : 'left' }]}>
                {item.firstName} {item.lastName}
              </Text>
              
              <Text style={[styles.locationInfo, { textAlign: isRtl ? 'right' : 'left' }]}>
                {item.residenceWilaya} - {item.residenceCommune}
              </Text>

              {/* Status Badge */}
              <View style={[styles.badgeContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
                <View style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}15` }]}>
                  <Text style={[styles.statusLabel, { color: statusInfo.color }]}>
                    {statusInfo.label}
                  </Text>
                </View>
              </View>

              {/* Stepper Progress Visualizer */}
              {renderStepper(statusInfo.step, isRejected)}
              <View style={[styles.stepperLabels, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
                <Text style={styles.stepLabel}>مودعة</Text>
                <Text style={styles.stepLabel}>قيد التحقق</Text>
                <Text style={styles.stepLabel}>قيد الدراسة</Text>
                <Text style={styles.stepLabel}>{isRejected ? 'مرفوضة' : 'مقبولة'}</Text>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color={theme.colors.border} />
            <Text style={styles.emptyText}>لم تقم بإيداع أي شكوى بعد.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  newBtn: {
    backgroundColor: theme.colors.primary,
    height: 44,
    borderRadius: theme.roundness.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  newBtnText: {
    color: '#FFFFFF',
    fontWeight: theme.typography.weights.medium,
    fontSize: theme.typography.sizes.sm,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  complaintCard: {
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  complaintId: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  submissionDate: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
  },
  complainantName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
  },
  locationInfo: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  badgeContainer: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.roundness.sm,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
  },
  stepperContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 2,
  },
  stepperLabels: {
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 0,
  },
  stepLabel: {
    fontSize: 8,
    color: theme.colors.textMuted,
    width: 50,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    marginTop: theme.spacing.md,
  },
});
