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

export default function Absensi({navigation, route}) {
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
        // padding: 10,
      }}></SafeAreaView>
  );
}

const styles = StyleSheet.create({});
