import { create } from 'zustand';

export type ComplaintStatus =
  | 'submitted'
  | 'under_verification'
  | 'under_review'
  | 'accepted'
  | 'contact_citizen'
  | 'rejected';

export interface Complaint {
  id: string;
  submissionDate: string;
  status: ComplaintStatus;
  complainantNature: 'person' | 'moral';
  firstName: string;
  lastName: string;
  nationalId: string;
  residenceWilaya: string;
  residenceCommune: string;
  mobilePhone: string;
  email: string;
}

interface ComplaintState {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'submissionDate' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => void;
}

// Pre-fill with a mock complaint to make the dashboard look active initially
const mockInitialComplaints: Complaint[] = [
  {
    id: 'COMP-2026-8912',
    submissionDate: '2026-06-15',
    status: 'under_review',
    complainantNature: 'person',
    firstName: 'Youcef',
    lastName: 'Benali',
    nationalId: '102938475610293847',
    residenceWilaya: 'Alger',
    residenceCommune: 'Sidi M\'hamed',
    mobilePhone: '0550123456',
    email: 'youcef.benali@gmail.com',
  }
];

export const useComplaintStore = create<ComplaintState>((set) => ({
  complaints: mockInitialComplaints,
  addComplaint: (data) => {
    const newComplaint: Complaint = {
      ...data,
      id: `COMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'under_verification',
    };
    set((state) => ({
      complaints: [newComplaint, ...state.complaints],
    }));
  },
  updateComplaintStatus: (id, status) => {
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
  },
}));
