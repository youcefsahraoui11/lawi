import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../styles/theme';
import { useLanguageStore } from '../store/useLanguageStore';

interface MapViewMockProps {
  latitude: number;
  longitude: number;
  lawyerName: string;
  officeAddress: string;
}

export default function MapViewMock({
  latitude,
  longitude,
  lawyerName,
  officeAddress,
}: MapViewMockProps) {
  const { isRtl } = useLanguageStore();

  return (
    <View style={styles.container}>
      {/* Mock Map Canvas */}
      <View style={styles.mapCanvas}>
        {/* Map grid lines simulation */}
        <View style={styles.gridLineHorizontal} />
        <View style={styles.gridLineVertical} />
        
        {/* Mock Map Pin */}
        <View style={styles.pinContainer}>
          <View style={styles.pin} />
          <View style={styles.pinShadow} />
        </View>

        {/* Mock Map Info Overlay */}
        <View style={[styles.infoOverlay, { right: isRtl ? undefined : 16, left: isRtl ? 16 : undefined }]}>
          <Text style={styles.overlayLabel}>OpenStreetMap (Mock)</Text>
          <Text style={styles.coords}>Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}</Text>
        </View>
      </View>
      
      <View style={styles.addressFooter}>
        <Text style={[styles.lawyerTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{lawyerName}</Text>
        <Text style={[styles.addressText, { textAlign: isRtl ? 'right' : 'left' }]}>{officeAddress}</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderRadius: theme.roundness.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#E0F2FE', // Light blue background indicating a map canvas
    marginBottom: theme.spacing.md,
  },
  mapCanvas: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLineHorizontal: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(11, 94, 215, 0.1)',
  },
  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(11, 94, 215, 0.1)',
  },
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.danger,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  pinShadow: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    marginTop: 2,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: theme.roundness.sm,
    padding: 6,
  },
  overlayLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: theme.typography.weights.medium,
  },
  coords: {
    color: '#CBD5E1',
    fontSize: 8,
  },
  addressFooter: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  lawyerTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
  },
  addressText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
});
