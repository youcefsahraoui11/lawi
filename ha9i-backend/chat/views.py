from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
import requests
import logging

logger = logging.getLogger(__name__)

class ChatAssistantView(APIView):
    """
    Gateway API endpoint for the Legal Assistant.
    Coordinates query traffic to the external RAG (Retrieval-Augmented Generation) microservice.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message', '').strip()
        if not user_message:
            return Response(
                {"error": "يجب إدخال نص السؤال القانوني. (Message is required)"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ----------------------------------------------------
        # PLUGGABLE RAG INTEGRATION SPACE
        # ----------------------------------------------------
        rag_url = getattr(settings, 'RAG_SERVICE_URL', None)
        rag_token = getattr(settings, 'RAG_SERVICE_TOKEN', None)

        if rag_url:
            try:
                # Prepare headers and query payload for the RAG service
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f"Token {rag_token}" if rag_token else ""
                }
                
                # Retrieve language code safely (default to 'ar')
                locale = getattr(request, 'LANGUAGE_CODE', 'ar')
                if not locale and hasattr(request, 'headers'):
                    locale = request.headers.get('Accept-Language', 'ar')[:2]
                
                payload = {
                    "query": user_message,
                    "user_id": request.user.id,
                    "locale": locale
                }
                
                # Make the POST call to the RAG service
                logger.info(f"Forwarding query to RAG system: {rag_url}")
                response = requests.post(rag_url, json=payload, headers=headers, timeout=5.0)
                
                if response.status_code == 200:
                    rag_data = response.json()
                    # Expecting response format: {"response": "legal guidance details"}
                    return Response({
                        "response": rag_data.get("response", "")
                    }, status=status.HTTP_200_OK)
                else:
                    logger.warning(f"RAG service returned status code {response.status_code}")
            
            except Exception as e:
                # Handle connection error, timeouts, or coding errors gracefully
                logger.error(f"Error calling RAG backend: {str(e)}")

        # ----------------------------------------------------
        # FALLBACK / OFFLINE MOCK MODE
        # ----------------------------------------------------
        # If the RAG service is offline, not configured, or timed out,
        # we return a structured legal guide response to ensure zero frontend crash.
        fallback_response = (
            f"شكرًا لسؤالك أستاذ(ة) {request.user.last_name}. طبقاً للقوانين الجزائرية الجاري بها العمل، "
            f"ولا سيما نصوص القانون المدني وقانون الإجراءات المدنية والإدارية، فإن هذا الموضوع يتطلب تقديم المستندات "
            f"الثبوتية أمام الجهات القضائية المختصة. يرجى مراجعة محامٍ معتمد في ولايتك للحصول على تفاصيل دقيقة تناسب وضعك الخاص."
        )

        return Response({
            "response": fallback_response,
            "note": "Offline/mock fallback mode active. Configured RAG URL: " + str(rag_url)
        }, status=status.HTTP_200_OK)
