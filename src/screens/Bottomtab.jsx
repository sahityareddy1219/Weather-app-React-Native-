import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTab = () => {
  // State to control the visibility of the details modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* The main tab container with a single button */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.centerButton} 
          onPress={() => setModalVisible(true)} // Open the modal on press
        >
          <Icon name="information-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal to display app details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Weather App Details</Text>
            
            <Text style={styles.sectionTitle}>What It Is</Text>
            <Text style={styles.modalText}>
              A cross-platform application built with React Native that provides real-time weather updates using the OpenWeather API. It features automatic location detection and manual city search.
            </Text>

            <Text style={styles.sectionTitle}>Tech Stack (How It's Made)</Text>
            <Text style={styles.modalText}>
              React Native, JavaScript, Geolocation API, OpenWeather API, and Vector Icons.
            </Text>

            <Text style={styles.sectionTitle}>Developed by </Text>
            <Text style={styles.modalText}>
              Chirra Sahitya Reddy
            </Text>
            <Text style={styles.modalText1}>
              student at NIAT
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Styles for the Bottom Tab
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center', // Center the single button
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'transparent', // Make container transparent to see behind the floating button
  },
  centerButton: {
    backgroundColor: '#7C4DFF',
    padding: 18,
    borderRadius: 50,
    elevation: 8, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  // Styles for the Modal
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Position modal at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2, // Shadow on top
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#7C4DFF',
  },
  modalText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 16,
    lineHeight: 24,
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 16,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#7C4DFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BottomTab;