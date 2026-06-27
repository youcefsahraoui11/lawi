import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useLanguageStore } from '../store/useLanguageStore';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const { isRtl } = useLanguageStore();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
});
