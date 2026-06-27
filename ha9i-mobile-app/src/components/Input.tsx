import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { theme } from '../styles/theme';
import { useLanguageStore } from '../store/useLanguageStore';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  containerStyle,
  ...textInputProps
}: InputProps) {
  const { isRtl } = useLanguageStore();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { textAlign: isRtl ? 'right' : 'left' }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            textAlign: isRtl ? 'right' : 'left',
            writingDirection: isRtl ? 'rtl' : 'ltr',
          },
          error ? styles.inputError : null,
        ]}
        placeholderTextColor={theme.colors.textMuted}
        {...textInputProps}
      />
      {error ? (
        <Text style={[styles.error, { textAlign: isRtl ? 'right' : 'left' }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  error: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
});
