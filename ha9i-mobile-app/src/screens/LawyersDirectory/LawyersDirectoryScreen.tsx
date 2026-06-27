import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Linking, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import MapViewMock from '../../components/MapViewMock';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  wilaya: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'أ. محمد بن أحمد (Mouloud Benahmed)',
    specialization: 'family_law',
    wilaya: 'Alger',
    address: 'شارع ديدوش مراد، الجزائر الوسطى، الجزائر العاصمة',
    phone: '021734567',
    latitude: 36.7642,
    longitude: 3.0588,
  },
  {
    id: '2',
    name: 'أ. سميرة بلقاسم (Samira Belkacem)',
    specialization: 'criminal_law',
    wilaya: 'Oran',
    address: 'نهج جيش التحرير الوطني، وهران',
    phone: '041401234',
    latitude: 35.6971,
    longitude: -0.6308,
  },
  {
    id: '3',
    name: 'أ. كمال حداد (Kamel Haddad)',
    specialization: 'civil_law',
    wilaya: 'Constantine',
    address: 'حي قدور بومدوس، قسنطينة',
    phone: '031925678',
    latitude: 36.3650,
    longitude: 6.6147,
  },
  {
    id: '4',
    name: 'أ. فريدة منصور (Farida Mansour)',
    specialization: 'labor_law',
    wilaya: 'Alger',
    address: 'شارع حسيبة بن بوعلي، سيدي امحمد، الجزائر',
    phone: '021654321',
    latitude: 36.7538,
    longitude: 3.0612,
  }
];

export default function LawyersDirectoryScreen() {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();

  const [selectedWilaya, setSelectedWilaya] = useState<string>('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [activeMapLawyer, setActiveMapLawyer] = useState<Lawyer | null>(null);

  const filterLawyers = () => {
    return mockLawyers.filter((lawyer) => {
      const matchWilaya = selectedWilaya === 'All' || lawyer.wilaya === selectedWilaya;
      const matchSpecialty = selectedSpecialization === 'All' || lawyer.specialization === selectedSpecialization;
      return matchWilaya && matchSpecialty;
    });
  };

  const filteredLawyers = filterLawyers();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <Header title={t('lawyers.title')} />

      {/* Filter Horizontal Lists */}
      <View style={styles.filterContainer}>
        {/* Wilaya Filter */}
        <Text style={[styles.filterLabel, { textAlign: isRtl ? 'right' : 'left' }]}>{t('common.wilaya')}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          {['All', 'Alger', 'Oran', 'Constantine'].map((wilaya) => (
            <TouchableOpacity
              key={wilaya}
              style={[
                styles.filterChip,
                selectedWilaya === wilaya && styles.filterChipActive,
              ]}
              onPress={() => setSelectedWilaya(wilaya)}
            >
              <Text style={[styles.chipText, selectedWilaya === wilaya && styles.chipTextActive]}>
                {wilaya === 'All' ? (isRtl ? 'الكل' : 'All') : wilaya}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Specialization Filter */}
        <Text style={[styles.filterLabel, { textAlign: isRtl ? 'right' : 'left' }]}>{t('common.specialization')}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          {['All', 'civil_law', 'criminal_law', 'family_law', 'labor_law'].map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterChip,
                selectedSpecialization === spec && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecialization(spec)}
            >
              <Text style={[styles.chipText, selectedSpecialization === spec && styles.chipTextActive]}>
                {spec === 'All' ? (isRtl ? 'الكل' : 'All') : t(`resources.cat_${spec.replace('_law', '')}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lawyers List */}
      <FlatList
        data={filteredLawyers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card>
            <Text style={[styles.lawyerName, { textAlign: isRtl ? 'right' : 'left' }]}>{item.name}</Text>
            <Text style={[styles.lawyerSpecialty, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t(`resources.cat_${item.specialization.replace('_law', '')}`)} - {item.wilaya}
            </Text>
            
            <View style={[styles.infoRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Ionicons name="location-outline" size={16} color={theme.colors.textMuted} />
              <Text style={[styles.infoText, { textAlign: isRtl ? 'right' : 'left', marginHorizontal: 8 }]}>
                {item.address}
              </Text>
            </View>

            <View style={[styles.infoRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Ionicons name="call-outline" size={16} color={theme.colors.textMuted} />
              <Text style={[styles.infoText, { textAlign: isRtl ? 'right' : 'left', marginHorizontal: 8 }]}>
                {item.phone}
              </Text>
            </View>

            <View style={[styles.actionRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Button
                title={t('lawyers.view_location')}
                onPress={() => setActiveMapLawyer(item)}
                style={styles.mapButton}
                textStyle={{ fontSize: 12 }}
              />
              <TouchableOpacity
                onPress={() => handleCall(item.phone)}
                style={styles.callIconButton}
              >
                <Ionicons name="call" size={18} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('lawyers.no_lawyers')}</Text>
          </View>
        }
      />

      {/* Map View Modal */}
      <Modal
        visible={activeMapLawyer !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveMapLawyer(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('lawyers.view_location')}</Text>
              <TouchableOpacity onPress={() => setActiveMapLawyer(null)}>
                <Ionicons name="close" size={24} color={theme.colors.secondary} />
              </TouchableOpacity>
            </View>
            
            {activeMapLawyer && (
              <MapViewMock
                latitude={activeMapLawyer.latitude}
                longitude={activeMapLawyer.longitude}
                lawyerName={activeMapLawyer.name}
                officeAddress={activeMapLawyer.address}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterLabel: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.roundness.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 4,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: theme.typography.weights.medium,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  lawyerName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  lawyerSpecialty: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.sm,
  },
  infoRow: {
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text,
    flex: 1,
  },
  actionRow: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  mapButton: {
    flex: 1,
    height: 36,
  },
  callIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: theme.roundness.xl,
    borderTopRightRadius: theme.roundness.xl,
    padding: theme.spacing.md,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
});
