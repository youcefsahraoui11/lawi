import { apiClient } from './client';
import { User } from '../store/useAuthStore';

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  nationalId?: string;
  passportNumber?: string;
}

export interface AuthResponse {
  access?: string;
  accessToken?: string;
  refresh?: string;
  refreshToken?: string;
  token?: string;
  user: User;
}

const normalizeUser = (user?: Record<string, any> | null): User => ({
  firstName: user?.first_name ?? user?.firstName ?? '',
  lastName: user?.last_name ?? user?.lastName ?? '',
  email: user?.email ?? '',
  nationalId: user?.national_id ?? user?.nationalId ?? undefined,
  passportNumber: user?.passport_number ?? user?.passportNumber ?? undefined,
});

const normalizeAuthResponse = (payload: any): AuthResponse => {
  const accessToken = payload.access ?? payload.accessToken ?? payload.token ?? '';
  const refreshToken = payload.refresh ?? payload.refreshToken ?? '';

  return {
    access: accessToken,
    accessToken,
    refresh: refreshToken,
    refreshToken,
    token: accessToken,
    user: normalizeUser(payload.user),
  } as AuthResponse;
};

const getErrorMessage = (error: unknown): string => {
  const maybeError = error as { response?: { data?: unknown }; message?: string };

  if (maybeError?.response?.data) {
    const payload = maybeError.response.data;

    if (typeof payload === 'string') {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      return JSON.stringify(payload);
    }
  }

  if (maybeError?.message) {
    return maybeError.message;
  }

  return 'Authentication failed';
};

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<{ access: string; refresh: string }>('/auth/login/', data);
      const accessToken = response.data.access;
      const profileResponse = await apiClient.get<Record<string, any>>('/auth/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return normalizeAuthResponse({
        ...response.data,
        user: profileResponse.data as Record<string, any>,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<any>('/auth/register/', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        national_id: data.nationalId,
        passport_number: data.passportNumber,
      });
      return normalizeAuthResponse(response.data);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
