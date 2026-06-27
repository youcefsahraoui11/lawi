import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useComplaintStore } from '../../store/useComplaintStore';
import { complaintsApi } from '../../api/complaints';
import { theme } from '../../styles/theme';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ComplaintFormScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const addComplaint = useComplaintStore((state) => state.addComplaint);

  // Form Fields
  const [complainantNature, setComplainantNature] = useState<'person' | 'moral'>('person');
  const [lastName, setLastName] = useState('');
  const [lastNameLatin, setLastNameLatin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameLatin, setFirstNameLatin] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  const [birthDate, setBirthDate] = useState('');
  const [birthCountry, setBirthCountry] = useState('Algeria');
  const [birthWilaya, setBirthWilaya] = useState('');
  const [birthCommune, setBirthCommune] = useState('');
  const [birthCertNum, setBirthCertNum] = useState('');
  
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  
  const [nationalId, setNationalId] = useState('');
  
  const [docType, setDocType] = useState('National ID Card');
  const [docNumber, setDocNumber] = useState('');
  const [docIssueDate, setDocIssueDate] = useState('');
  const [docIssuedBy, setDocIssuedBy] = useState('');
  
  const [residenceAddress, setResidenceAddress] = useState('');
  const [residenceWilaya, setResidenceWilaya] = useState('');
  const [residenceCommune, setResidenceCommune] = useState('');
  
  const [mobilePhone, setMobilePhone] = useState('');
  const [confirmMobilePhone, setConfirmMobilePhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Accordion active sections
  const [activeSection, setActiveSection] = useState<number>(0);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    
    // Core validations
    if (!lastName) tempErrors.lastName = t('common.required');
    if (!firstName) tempErrors.firstName = t('common.required');
    if (!birthCertNum) tempErrors.birthCertNum = t('common.required');
    if (!nationalId) {
      tempErrors.nationalId = t('common.required');
    } else if (nationalId.length !== 18) {
      tempErrors.nationalId = t('auth.invalid_nin');
    }
    
    if (!docNumber) tempErrors.docNumber = t('common.required');
    
    if (!mobilePhone) {
      tempErrors.mobilePhone = t('common.required');
    } else if (mobilePhone !== confirmMobilePhone) {
      tempErrors.confirmMobilePhone = t('complaints.phone_mismatch');
    }
    
    if (!email) {
      tempErrors.email = t('common.required');
    } else if (email !== confirmEmail) {
      tempErrors.confirmEmail = t('complaints.email_mismatch');
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert(t('common.filter') || 'Validation', 'يرجى مراجعة الحقول المطلوبة والتأكد من تطابق الهاتف والبريد الإلكتروني.');
      return;
    }

    setLoading(true);
    try {
      const result = await complaintsApi.submit({
        complainantNature,
        lastName,
        lastNameLatin,
        firstName,
        firstNameLatin,
        gender,
        birthDate,
        birthCountry,
        birthWilaya,
        birthCommune,
        birthCertNum,
        fatherName,
        motherName,
        nationalId,
        docType,
        docNumber,
        docIssueDate,
        docIssuedBy,
        residenceAddress,
        residenceWilaya,
        residenceCommune,
        mobilePhone,
        email,
      });

      addComplaint(result);
      Alert.alert(
        t('complaints.title'),
        t('complaints.success_msg'),
        [{ text: t('common.confirm'), onPress: () => navigation.navigate('Complaints') }]
      );
    } catch (err) {
      Alert.alert('Error', 'خطأ في عملية إرسال الشكوى.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? -1 : index);
  };

  const renderSectionHeader = (title: string, index: number) => {
    const isActive = activeSection === index;
    return (
      <TouchableOpacity
        style={[styles.sectionHeader, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
        onPress={() => toggleSection(index)}
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.colors.secondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('complaints.title')} showBackButton />

      <ScrollView style={styles.formContainer} contentContainerStyle={styles.contentContainer}>
        
        {/* Section 1: Complainant Nature & Name */}
        {renderSectionHeader(t('complaints.sec_complainant'), 0)}
        {activeSection === 0 && (
          <View style={styles.sectionContent}>
            {/* Nature of Complainant Toggle */}
            <Text style={[styles.fieldLabel, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t('complaints.complainant_nature')}
            </Text>
            <View style={[styles.natureToggle, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <TouchableOpacity
                style={[styles.natureButton, complainantNature === 'person' && styles.natureActive]}
                onPress={() => setComplainantNature('person')}
              >
                <Text style={[styles.natureText, complainantNature === 'person' && styles.natureActiveText]}>
                  {t('complaints.complainant_nature_person')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.natureButton, complainantNature === 'moral' && styles.natureActive]}
                onPress={() => setComplainantNature('moral')}
              >
                <Text style={[styles.natureText, complainantNature === 'moral' && styles.natureActiveText]}>
                  {t('complaints.complainant_nature_moral')}
                </Text>
              </TouchableOpacity>
            </View>

            <Input
              label={t('complaints.last_name')}
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
            />
            <Input
              label={t('complaints.last_name_latin')}
              value={lastNameLatin}
              onChangeText={setLastNameLatin}
            />
            <Input
              label={t('complaints.first_name')}
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
            />
            <Input
              label={t('complaints.first_name_latin')}
              value={firstNameLatin}
              onChangeText={setFirstNameLatin}
            />

            {/* Gender Selection */}
            <Text style={[styles.fieldLabel, { textAlign: isRtl ? 'right' : 'left' }]}>
              {t('complaints.gender')}
            </Text>
            <View style={[styles.natureToggle, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
              <TouchableOpacity
                style={[styles.natureButton, gender === 'male' && styles.natureActive]}
                onPress={() => setGender('male')}
              >
                <Text style={[styles.natureText, gender === 'male' && styles.natureActiveText]}>
                  {t('complaints.gender_male')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.natureButton, gender === 'female' && styles.natureActive]}
                onPress={() => setGender('female')}
              >
                <Text style={[styles.natureText, gender === 'female' && styles.natureActiveText]}>
                  {t('complaints.gender_female')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Section 2: Birth info */}
        {renderSectionHeader(t('complaints.sec_birth'), 1)}
        {activeSection === 1 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.birth_date')}
              placeholder="YYYY-MM-DD"
              value={birthDate}
              onChangeText={setBirthDate}
            />
            <Input
              label={t('complaints.birth_country')}
              value={birthCountry}
              onChangeText={setBirthCountry}
            />
            <Input
              label={t('complaints.birth_wilaya')}
              value={birthWilaya}
              onChangeText={setBirthWilaya}
            />
            <Input
              label={t('complaints.birth_commune')}
              value={birthCommune}
              onChangeText={setBirthCommune}
            />
            <Input
              label={t('complaints.birth_cert_num')}
              value={birthCertNum}
              onChangeText={setBirthCertNum}
              error={errors.birthCertNum}
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Section 3: Family info */}
        {renderSectionHeader(t('complaints.sec_family'), 2)}
        {activeSection === 2 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.father_name')}
              value={fatherName}
              onChangeText={setFatherName}
            />
            <Input
              label={t('complaints.mother_name')}
              value={motherName}
              onChangeText={setMotherName}
            />
          </View>
        )}

        {/* Section 4: NIN */}
        {renderSectionHeader(t('complaints.sec_national_id'), 3)}
        {activeSection === 3 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.nin')}
              placeholder="102938475610293847"
              value={nationalId}
              onChangeText={setNationalId}
              error={errors.nationalId}
              keyboardType="numeric"
              maxLength={18}
            />
          </View>
        )}

        {/* Section 5: ID Document details */}
        {renderSectionHeader(t('complaints.sec_document'), 4)}
        {activeSection === 4 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.doc_type')}
              value={docType}
              onChangeText={setDocType}
            />
            <Input
              label={t('complaints.doc_number')}
              value={docNumber}
              onChangeText={setDocNumber}
              error={errors.docNumber}
            />
            <Input
              label={t('complaints.doc_issue_date')}
              placeholder="YYYY-MM-DD"
              value={docIssueDate}
              onChangeText={setDocIssueDate}
            />
            <Input
              label={t('complaints.doc_issued_by')}
              value={docIssuedBy}
              onChangeText={setDocIssuedBy}
            />
          </View>
        )}

        {/* Section 6: Residence */}
        {renderSectionHeader(t('complaints.sec_residence'), 5)}
        {activeSection === 5 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.residence_address')}
              value={residenceAddress}
              onChangeText={setResidenceAddress}
            />
            <Input
              label={t('complaints.residence_wilaya')}
              value={residenceWilaya}
              onChangeText={setResidenceWilaya}
            />
            <Input
              label={t('complaints.residence_commune')}
              value={residenceCommune}
              onChangeText={setResidenceCommune}
            />
          </View>
        )}

        {/* Section 7: Contact Info */}
        {renderSectionHeader(t('complaints.sec_contact'), 6)}
        {activeSection === 6 && (
          <View style={styles.sectionContent}>
            <Input
              label={t('complaints.mobile_phone')}
              value={mobilePhone}
              onChangeText={setMobilePhone}
              error={errors.mobilePhone}
              keyboardType="phone-pad"
            />
            <Input
              label={t('complaints.confirm_mobile_phone')}
              value={confirmMobilePhone}
              onChangeText={setConfirmMobilePhone}
              error={errors.confirmMobilePhone}
              keyboardType="phone-pad"
            />
            <Input
              label={t('common.email')}
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={t('complaints.confirm_email')}
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              error={errors.confirmEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        <Button
          title={t('common.submit')}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitBtn}
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
  formContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.md,
    borderRadius: theme.roundness.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: -theme.spacing.sm,
  },
  fieldLabel: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  natureToggle: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    height: 40,
  },
  natureButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  natureActive: {
    backgroundColor: theme.colors.primary,
  },
  natureText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  natureActiveText: {
    color: '#FFFFFF',
    fontWeight: theme.typography.weights.medium,
  },
  submitBtn: {
    marginTop: theme.spacing.md,
  },
});
