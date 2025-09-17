import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTab = () => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="location-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton}>
        <Icon name="menu-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'rgba(60, 40, 120, 0.9)', // Matches screenshot purple tone
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    padding: 10,
  },
  centerButton: {
    backgroundColor: '#7C4DFF',
    padding: 16,
    borderRadius: 50,
    marginTop: -30,
    elevation: 5,
  },
});

export default BottomTab;
