import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

interface LegalDoc {
  id: string;
  title: string;
  category: 'civil' | 'criminal' | 'family' | 'admin' | 'labor' | 'constitution' | 'official';
  date: string;
  summary: string;
}

const mockDocuments: LegalDoc[] = [
  {
    id: 'doc-1',
    title: 'القانون المدني الجزائري (الأمر رقم 75-58)',
    category: 'civil',
    date: '1975-09-26',
    summary: 'يتضمن القواعد القانونية الأساسية للعقود، الملكية، الالتزامات والمسؤولية التقصيرية في القانون الجزائري.',
  },
  {
    id: 'doc-2',
    title: 'قانون العقوبات الجزائري (الأمر رقم 66-156)',
    category: 'criminal',
    date: '1966-06-08',
    summary: 'يحدد الجرائم والمخالفات المرتكبة والعقوبات المقررة لها والتدابير الأمنية المطبقة في الجزائر.',
  },
  {
    id: 'doc-3',
    title: 'قانون الأسرة الجزائري (القانون رقم 84-11)',
    category: 'family',
    date: '1984-06-09',
    summary: 'ينظم أحكام الزواج، انحلال الميثاق الزوجي، الولاية، الحضانة، الميراث والنفقة.',
  },
  {
    id: 'doc-4',
    title: 'دستور الجمهورية الجزائرية الديمقراطية الشعبية',
    category: 'constitution',
    date: '2020-12-30',
    summary: 'القانون الأسمى للدولة الذي يحدد شكل الحكم والحقوق الأساسية والحريات الفردية والجماعية.',
  },
  {
    id: 'doc-5',
    title: 'قانون العمل الجزائري (القانون رقم 90-11)',
    category: 'labor',
    date: '1990-04-21',
    summary: 'ينظم علاقات العمل الفردية والجماعية وحقوق العمال وأصحاب العمل والتمثيل النقابي.',
  }
];

export default function LegalResourcesScreen() {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePreviewDoc, setActivePreviewDoc] = useState<LegalDoc | null>(null);

  const categories = ['All', 'civil', 'criminal', 'family', 'admin', 'labor', 'constitution', 'official'];

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDownload = (title: string) => {
    Alert.alert(t('resources.download_pdf'), `جاري تحميل ملف PDF الخاص بـ: \n${title}`);
  };

  return (
    <View style={styles.container}>
      <Header title={t('resources.title')} />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchBox, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <Ionicons name="search" size={20} color={theme.colors.textMuted} />
          <TextInput
            style={[
              styles.searchInput,
              {
                textAlign: isRtl ? 'right' : 'left',
                writingDirection: isRtl ? 'rtl' : 'ltr',
                marginHorizontal: 8,
              },
            ]}
            placeholder={t('resources.search_placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Chips Scroll */}
      <View style={styles.categoryBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categoryScroll, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {cat === 'All' ? (isRtl ? 'الكل' : 'All') : t(`resources.cat_${cat}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Documents List */}
      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card>
            <View style={[styles.cardHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <View style={[styles.catBadge, { backgroundColor: `${theme.colors.primary}12` }]}>
                <Text style={styles.catBadgeText}>{t(`resources.cat_${item.category}`)}</Text>
              </View>
              <Text style={styles.docDate}>{item.date}</Text>
            </View>

            <Text style={[styles.docTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{item.title}</Text>
            <Text style={[styles.docSummary, { textAlign: isRtl ? 'right' : 'left' }]}>{item.summary}</Text>

            <View style={[styles.actionsRow, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <Button
                title={t('resources.preview_pdf')}
                onPress={() => setActivePreviewDoc(item)}
                style={styles.previewBtn}
                textStyle={{ fontSize: 12 }}
              />
              <TouchableOpacity
                style={styles.downloadIconBtn}
                onPress={() => handleDownload(item.title)}
              >
                <Ionicons name="download-outline" size={18} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />

      {/* PDF Preview Modal Mock */}
      <Modal
        visible={activePreviewDoc !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setActivePreviewDoc(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>{activePreviewDoc?.title}</Text>
              <TouchableOpacity onPress={() => setActivePreviewDoc(null)}>
                <Ionicons name="close" size={24} color={theme.colors.secondary} />
              </TouchableOpacity>
            </View>

            {/* Mock PDF Canvas */}
            <View style={styles.pdfCanvas}>
              <Ionicons name="document-text" size={64} color={theme.colors.textMuted} />
              <Text style={styles.pdfMockLabel}>أولى صفحات وثيقة PDF الرسمية</Text>
              <View style={styles.pdfTextLine} />
              <View style={[styles.pdfTextLine, { width: '80%' }]} />
              <View style={[styles.pdfTextLine, { width: '60%' }]} />
            </View>

            <Button
              title={t('resources.download_pdf')}
              onPress={() => {
                if (activePreviewDoc) {
                  handleDownload(activePreviewDoc.title);
                  setActivePreviewDoc(null);
                }
              }}
              style={styles.modalDownloadBtn}
            />
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
  searchBarContainer: {
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.roundness.md,
    paddingHorizontal: theme.spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
  },
  categoryBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  categoryScroll: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.roundness.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 4,
  },
  categoryChipActive: {
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
  cardHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  catBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.roundness.sm,
  },
  catBadgeText: {
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
  },
  docDate: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  docTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  docSummary: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text,
    lineHeight: 18,
    marginTop: theme.spacing.xs,
  },
  actionsRow: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  previewBtn: {
    flex: 1,
    height: 36,
  },
  downloadIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.roundness.xl,
    padding: theme.spacing.md,
    width: '100%',
    maxWidth: 400,
    height: '60%',
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    flex: 1,
    marginRight: 8,
  },
  pdfCanvas: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: theme.roundness.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    marginVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pdfMockLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  pdfTextLine: {
    height: 6,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: theme.spacing.sm,
  },
  modalDownloadBtn: {
    height: 44,
  },
});
