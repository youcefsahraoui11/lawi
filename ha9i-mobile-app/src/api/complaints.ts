import { apiClient } from './client';
import { Complaint, ComplaintStatus } from '../store/useComplaintStore';

export interface SubmitComplaintRequest {
  complainantNature: 'person' | 'moral';
  lastName: string;
  lastNameLatin: string;
  firstName: string;
  firstNameLatin: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthCountry: string;
  birthWilaya: string;
  birthCommune: string;
  birthCertNum: string;
  fatherName: string;
  motherName: string;
  nationalId: string;
  docType: string;
  docNumber: string;
  docIssueDate: string;
  docIssuedBy: string;
  residenceAddress: string;
  residenceWilaya: string;
  residenceCommune: string;
  mobilePhone: string;
  email: string;
}

export const complaintsApi = {
  submit: async (data: SubmitComplaintRequest): Promise<Complaint> => {
    try {
      const payload = {
        complainant_nature: data.complainantNature,
        last_name: data.lastName,
        last_name_latin: data.lastNameLatin,
        first_name: data.firstName,
        first_name_latin: data.firstNameLatin,
        gender: data.gender,
        birth_date: data.birthDate,
        birth_country: data.birthCountry,
        birth_wilaya: data.birthWilaya,
        birth_commune: data.birthCommune,
        birth_certificate_number: data.birthCertNum,
        father_name: data.fatherName,
        mother_name: data.motherName,
        national_id: data.nationalId,
        doc_type: data.docType,
        doc_number: data.docNumber,
        doc_issue_date: data.docIssueDate,
        doc_issued_by: data.docIssuedBy,
        residence_address: data.residenceAddress,
        residence_wilaya: data.residenceWilaya,
        residence_commune: data.residenceCommune,
        mobile_phone: data.mobilePhone,
        email: data.email,
      };

      const response = await apiClient.post<any>('/complaints/', payload);
      const resData = response.data;
      
      return {
        id: String(resData.id),
        submissionDate: resData.submission_date ? resData.submission_date.split('T')[0] : new Date().toISOString().split('T')[0],
        status: resData.status,
        complainantNature: resData.complainant_nature,
        lastName: resData.last_name,
        lastNameLatin: resData.last_name_latin,
        firstName: resData.first_name,
        firstNameLatin: resData.first_name_latin,
        gender: resData.gender,
        birthDate: resData.birth_date,
        birthCountry: resData.birth_country,
        birthWilaya: resData.birth_wilaya,
        birthCommune: resData.birth_commune,
        birthCertNum: resData.birth_certificate_number,
        fatherName: resData.father_name,
        motherName: resData.mother_name,
        nationalId: resData.national_id,
        docType: resData.doc_type,
        docNumber: resData.doc_number,
        docIssueDate: resData.doc_issue_date,
        docIssuedBy: resData.doc_issued_by,
        residenceAddress: resData.residence_address,
        residenceWilaya: resData.residence_wilaya,
        residenceCommune: resData.residence_commune,
        mobilePhone: resData.mobile_phone,
        email: resData.email,
      } as any;
    } catch (error) {
      console.warn('Complaints API error, falling back to mock:', error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        id: `COMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'under_verification',
        ...data,
      };
    }
  },

  getStatus: async (id: string): Promise<{ status: ComplaintStatus }> => {
    try {
      const response = await apiClient.get<{ status: ComplaintStatus }>(`/complaints/${id}/status/`);
      return response.data;
    } catch (error) {
      console.warn('Complaints GetStatus API error, falling back to mock:', error);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { status: 'under_review' };
    }
  },
};
