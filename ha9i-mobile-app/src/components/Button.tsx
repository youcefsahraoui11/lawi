import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'danger':
        return theme.colors.danger;
      case 'primary':
      default:
        return theme.colors.primary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#fff' : '#fff'} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: theme.roundness.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  text: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
