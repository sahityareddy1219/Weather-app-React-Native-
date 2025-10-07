import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const SplashScreen = ({ navigation }) => {
  // This effect runs once when the component mounts
  React.useEffect(() => {
    // Set a timer for 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      // After 3 seconds, replace the splash screen with the Home screen
      // 'replace' is used so the user can't go back to the splash screen
      navigation.replace('Home');
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Icon name="cloudy-outline" size={120} color="#fff" />
      <Text style={styles.title}>Weather App</Text>
      <Text style={styles.subtitle}>Your Weather Forecast App</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#fff',
    marginTop: 8,
  },
});

export default SplashScreen;