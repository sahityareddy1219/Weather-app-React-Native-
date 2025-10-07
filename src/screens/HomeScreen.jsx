import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import WeatherDetails from './WeatherScreen';
import BottomTab from './Bottomtab';

const API_KEY = 'd0a9f2864244af641ab34e9c9feea1fc';

const HomeScreen = () => {
  const [address, setAddress] = useState('Fetching location...');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to show your address.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setAddress('Permission denied');
          return;
        }
      }
      getCurrentLocation();
    } catch (err) {
      console.warn(err);
      setAddress('Error requesting permission');
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        fetchAddress(latitude, longitude);
        fetchWeather(latitude, longitude);
      },
      error => {
        console.log(error);
        setAddress(error.code === 1 ? 'Permission denied by user' : 'Unable to fetch location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data?.address) {
        const { suburb, city, town, village, state, country } = data.address;
        const locationParts = [suburb, city || town || village, state, country].filter(Boolean);
        setAddress(locationParts.join(', '));
      } else {
        setAddress(`Lat: ${lat}, Lon: ${lon}`);
      }
    } catch {
      setAddress(`Lat: ${lat}, Lon: ${lon}`);
    }
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeatherData({ ...data, cityName });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const searchCityWeather = async () => {
    if (!search.trim()) return;
    try {
      setLoading(true);
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        fetchWeather(lat, lon, search);
      } else {
        alert('City not found');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/331e1bd520ff80f00a061ff891eda20d542b0353.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar backgroundColor="#222831" barStyle="light-content" />
          <Text style={styles.title}>Weather App</Text>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={searchCityWeather}>
              <Icon name="search" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#00ADB5" />
          ) : (
            <> 
              <Text style={styles.label}>Current Location :</Text>
              <Text style={styles.address}>{address}</Text>
              <WeatherDetails data={weatherData} city={weatherData?.cityName} />
            </>
          )}
        </ScrollView>
        <BottomTab />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EEE',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffffff',
    fontWeight: 'bold',
    color: '#000000ff',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchBtn: {
    backgroundColor: '#00ADB5',
    marginLeft: 10,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#EEE',
    marginTop: 20,
  },
  address: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
  },
});

export default HomeScreen;
 


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   ActivityIndicator,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Geolocation from 'react-native-geolocation-service';
// import { useNavigation } from '@react-navigation/native'; // ✅ import
// import BottomTab from './Bottomtab';

// const API_KEY = 'd0a9f2864244af641ab34e9c9feea1fc';

// const HomeScreen = () => {
//   const [address, setAddress] = useState('Fetching location...');
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [coords, setCoords] = useState(null);
//   const navigation = useNavigation(); // ✅ hook

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'We need access to your location to show your address.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           setAddress('Permission denied');
//           return;
//         }
//       }
//       getCurrentLocation();
//     } catch (err) {
//       console.warn(err);
//       setAddress('Error requesting permission');
//     }
//   };

//   const getCurrentLocation = () => {
//     setLoading(true);
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ lat: latitude, lon: longitude });
//       },
//       error => {
//         console.log(error);
//         setAddress(error.code === 1 ? 'Permission denied by user' : 'Unable to fetch location');
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const searchCityWeather = async () => {
//     if (!search.trim()) return;
//     try {
//       setLoading(true);
//       const geoRes = await fetch(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`
//       );
//       const geoData = await geoRes.json();
//       if (geoData.length > 0) {
//         const { lat, lon } = geoData[0];
//         // ✅ Navigate to Weather screen & pass params
//         navigation.navigate('Weather', { lat, lon, cityName: search });
//       } else {
//         alert('City not found');
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/331e1bd520ff80f00a061ff891eda20d542b0353.jpg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <StatusBar backgroundColor="#222831" barStyle="light-content" />
//           <Text style={styles.title}>Weather App</Text>

//           <View style={styles.searchRow}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search city..."
//               placeholderTextColor="#999"
//               value={search}
//               onChangeText={setSearch}
//             />
//             <TouchableOpacity style={styles.searchBtn} onPress={searchCityWeather}>
//               <Icon name="search" size={22} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           {loading && <ActivityIndicator size="large" color="#00ADB5" />}
//         </ScrollView>
//         <BottomTab />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { flexGrow: 1, padding: 20, paddingBottom: 40 },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#EEE',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   searchRow: { flexDirection: 'row', marginBottom: 20 },
//   searchInput: {
//     flex: 1,
//     backgroundColor: '#ffffffff',
//     fontWeight: 'bold',
//     color: '#000000ff',
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   searchBtn: {
//     backgroundColor: '#00ADB5',
//     marginLeft: 10,
//     padding: 12,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;
