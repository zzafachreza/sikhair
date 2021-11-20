import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {TouchableOpacity} from 'react-native';
import {fonts, windowHeight} from '../../utils/fonts';

export default function AbsensiSiswa({navigation, route}) {
  const [visible, setVisible] = useState(true);
  const hideSpinner = () => {
    setVisible(false);
  };

  const myUrl =
    `https://pesantrenkhairunnas.sch.id/api/absensi.php?nisn=` +
    route.params.nisn;

  console.log(myUrl);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('AbsenAkademik', {
            nisn: route.params.nisn,
          })
        }>
        <Text style={styles.cardText}>Kehadiran Akademik</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('AbsenTahfidz', {
            nisn: route.params.nisn,
          })
        }>
        <Text style={styles.cardText}>Kehadiran Tahfidz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    marginVertical: 20,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    fontFamily: fonts.secondary[600],
    fontSize: windowHeight / 20,
    color: colors.white,
  },
});
