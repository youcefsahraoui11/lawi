import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../styles/theme';
import { chatApi } from '../../api/chat';
import { useLanguageStore } from '../../store/useLanguageStore';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function LegalAssistantScreen() {
  const { t } = useTranslation();
  const { isRtl } = useLanguageStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: t('assistant.welcome_msg'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    
    // Auto scroll down
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      // Integration Layer calls the POST /api/chat/ endpoint
      const responseData = await chatApi.sendMessage(userMessage.text);
      
      const assistantMessage: Message = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: responseData.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: 'عذرًا، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقًا.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Header title={t('assistant.title')} showBackButton />

      {/* Legal Disclaimer Box */}
      <View style={styles.disclaimerBox}>
        <Text style={[styles.disclaimerText, { textAlign: isRtl ? 'right' : 'left' }]}>
          {t('assistant.disclaimer')}
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                { flexDirection: isUser ? 'row' : 'row' },
                isUser ? styles.userRow : styles.assistantRow,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.assistantBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: isUser ? '#FFFFFF' : theme.colors.text,
                      textAlign: isRtl ? 'right' : 'left',
                    },
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.timeText,
                    {
                      color: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted,
                      textAlign: isUser ? 'right' : 'left',
                    },
                  ]}
                >
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          );
        })}
        {loading && (
          <View style={styles.loadingBubbleRow}>
            <View style={styles.loadingBubble}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Tray */}
      <View style={[styles.inputTray, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TextInput
          style={[
            styles.input,
            {
              textAlign: isRtl ? 'right' : 'left',
              writingDirection: isRtl ? 'rtl' : 'ltr',
            },
          ]}
          placeholder={t('assistant.placeholder')}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isRtl ? 'paper-plane-outline' : 'paper-plane'}
            size={20}
            color="#FFFFFF"
            style={{ transform: [{ scaleX: isRtl ? -1 : 1 }] }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  disclaimerBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  disclaimerText: {
    fontSize: 10,
    color: theme.colors.textMuted,
    lineHeight: 14,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: theme.spacing.md,
    paddingBottom: 24,
  },
  messageRow: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  userRow: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: theme.roundness.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 2,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: theme.typography.sizes.sm,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 8,
    marginTop: 6,
  },
  loadingBubbleRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  loadingBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  loadingText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
  },
  inputTray: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.xl,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    backgroundColor: '#F8FAFC',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
});
