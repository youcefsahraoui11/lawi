import { apiClient } from './client';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

export const chatApi = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    try {
      // The application will call POST /api/chat/ with the user's message
      // The backend RAG pipeline will reply.
      
      const response = await apiClient.post<ChatResponse>('/chat/', { message });
      return response.data;
    } catch (error) {
      console.warn('RAG Assistant API error, falling back to mock:', error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        response: `شكرًا لسؤالك. طبقاً للقوانين الجزائرية الجاري بها العمل، ولا سيما نصوص القانون المدني وقانون الإجراءات المدنية والإدارية، فإن هذا الموضوع يتطلب تقديم المستندات الثبوتية أمام الجهات القضائية المختصة. يرجى مراجعة محامٍ معتمد في ولايتك للحصول على تفاصيل دقيقة تناسب وضعك الخاص.`
      };
    }
  },
};
