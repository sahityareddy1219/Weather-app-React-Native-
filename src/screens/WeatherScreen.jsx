import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherDetails = ({ data, city }) => {
  if (!data || data.cod !== 200) return null;

  const { sys, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      {/* --- FIX --- */}
      <Text style={styles.city}>{`${city || data.name}, ${sys.country}`}</Text>
      
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      
      {/* --- FIX --- */}
      <Text style={styles.temp}>{`${main.temp}°C`}</Text>
      
      <Text style={styles.desc}>{weather[0].description}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Feels Like:</Text>
        {/* --- FIX --- */}
        <Text style={styles.value}>{`${main.feels_like}°C`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Humidity:</Text>
        {/* --- FIX --- */}
        <Text style={styles.value}>{`${main.humidity}%`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pressure:</Text>
        {/* --- FIX --- */}
        <Text style={styles.value}>{`${main.pressure} hPa`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Wind:</Text>
        {/* --- FIX --- */}
        <Text style={styles.value}>{`${wind.speed} m/s`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center' },
  city: { fontSize: 28, fontWeight: 'bold', color: '#EEEEEE', marginBottom: 10 },
  icon: { width: 150, height: 150 },
  temp: { fontSize: 48, fontWeight: 'bold', color: '#00ADB5' },
  desc: { fontSize: 20, color: '#EEEEEE', marginBottom: 20, textTransform: 'capitalize' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', paddingVertical: 5 },
  label: { fontSize: 18, color: '#EEEEEE' },
  value: { fontSize: 18, color: '#00ADB5' },
});

export default WeatherDetails;


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   ImageBackground,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// const API_KEY = 'd0a9f2864244af641ab34e9c9feea1fc';

// const WeatherScreen = ({ route }) => {
//   const { lat, lon, cityName } = route.params;
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   const fetchWeather = async () => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//       );
//       const data = await res.json();
//       setWeatherData({ ...data, cityName });
//     } catch (err) {
//       console.log(err);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#00ADB5" />
//       </View>
//     );
//   }

//   if (!weatherData || weatherData.cod !== 200) {
//     return (
//       <View style={styles.loading}>
//         <Text style={{ color: '#fff', fontSize: 18 }}>Weather data not available</Text>
//       </View>
//     );
//   }

//   const { sys, main, weather, wind } = weatherData;
//   const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

//   return (
//     <ImageBackground
//       source={require('../../assets/331e1bd520ff80f00a061ff891eda20d542b0353.jpg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <StatusBar backgroundColor="#222831" barStyle="light-content" />

//         {/* City + Country */}
//         <Text style={styles.city}>
//           {cityName || weatherData.name}, {sys.country}
//         </Text>

//         {/* Weather Icon */}
//         <Image source={{ uri: iconUrl }} style={styles.icon} />

//         {/* Temperature + Description */}
//         <Text style={styles.temp}>{main.temp}°C</Text>
//         <Text style={styles.desc}>{weather[0].description}</Text>

//         {/* Extra Info */}
//         <View style={styles.row}>
//           <Text style={styles.label}>Feels Like:</Text>
//           <Text style={styles.value}>{main.feels_like}°C</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Humidity:</Text>
//           <Text style={styles.value}>{main.humidity}%</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Pressure:</Text>
//           <Text style={styles.value}>{main.pressure} hPa</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Wind:</Text>
//           <Text style={styles.value}>{wind.speed} m/s</Text>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   container: { flexGrow: 1, alignItems: 'center', padding: 20 },
//   loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222831' },

//   city: { fontSize: 28, fontWeight: 'bold', color: '#EEEEEE', marginBottom: 10, textAlign: 'center' },
//   icon: { width: 150, height: 150 },
//   temp: { fontSize: 48, fontWeight: 'bold', color: '#00ADB5' },
//   desc: {
//     fontSize: 20,
//     color: '#EEEEEE',
//     marginBottom: 20,
//     textTransform: 'capitalize',
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     paddingVertical: 8,
//   },
//   label: { fontSize: 18, color: '#EEEEEE' },
//   value: { fontSize: 18, color: '#00ADB5' },
// });

// export default WeatherScreen;
