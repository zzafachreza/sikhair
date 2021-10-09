import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';

export default function NilaiAkademis({navigation, route}) {
  const user = route.params;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([
    {
      kegiatan: 'ini untuk nama kegiatan',
      nilai: 78,
      deskripsi: 'ini merupakan kegiatan ekstrakurikuler yang sangat penting',
    },
  ]);
  const [pilih, setPilih] = useState('Bulanan');

  const getData = () => {
    axios
      .get(
        'https://pesantrenkhairunnas.sch.id/api/nilai_akademis.php?nisn=' +
          user.nisn,
      )
      .then(res => {
        setData(res.data);
      });
  };

  const getData2 = () => {
    axios
      .get(
        'https://pesantrenkhairunnas.sch.id/api/nilai_ekstrakurikuler.php?nisn=' +
          user.nisn,
      )
      .then(res => {
        // setData2(res.data);
      });
  };

  useEffect(() => {
    getData();
    getData2();
  }, []);

  const getNilai = x => {
    setPilih(x);
  };

  return (
    <SafeAreaView
      style={{
        padding: 10,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          //   backgroundColor: colors.primary,
          //   justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => getNilai('Bulanan')}
          style={{
            padding: 10,
            backgroundColor:
              pilih == 'Bulanan' ? colors.secondary : colors.white,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: pilih == 'Bulanan' ? colors.white : colors.secondary,
              fontSize: windowWidth / 25,
              fontFamily: fonts.secondary[600],
            }}>
            Bulanan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getNilai('Ekstrakurikuler')}
          style={{
            padding: 10,
            marginHorizontal: 10,
            backgroundColor:
              pilih == 'Ekstrakurikuler' ? colors.secondary : colors.white,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color:
                pilih == 'Ekstrakurikuler' ? colors.white : colors.secondary,
              fontSize: windowWidth / 25,
              fontFamily: fonts.secondary[600],
            }}>
            Ekstrakurikuler
          </Text>
        </TouchableOpacity>
      </View>
      {/* bulanan */}
      {pilih == 'Bulanan' && (
        <View style={{flex: 1}}>
          {data.map(item => {
            return (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      // backgroundColor: colors.secondary,
                      flex: 1,
                      paddingLeft: 10,
                      color: colors.white,
                      fontSize: windowWidth / 20,
                      fontFamily: fonts.secondary[600],
                    }}>
                    {item.namamatapelajaran}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: colors.secondary,
                      padding: 10,
                      color: colors.white,
                      fontSize: windowWidth / 28,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'right',
                    }}>
                    {item.periode}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                    }}>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontSize: windowWidth / 25,
                        fontFamily: fonts.secondary[600],
                      }}>
                      Nilai Pengetahuan
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: windowWidth / 20,
                        margin: 5,
                        fontFamily: fonts.secondary[600],
                      }}>
                      {item.nilai_pengetahuan}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontSize: windowWidth / 25,
                        fontFamily: fonts.secondary[600],
                      }}>
                      Nilai Keterampilan
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: windowWidth / 20,
                        margin: 5,
                        fontFamily: fonts.secondary[600],
                      }}>
                      {item.nilai_keterampilan}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
      {/* bulanan */}

      {/* Ekstrakurikuler */}

      {pilih == 'Ekstrakurikuler' && (
        <View style={{flex: 1}}>
          {data2.map(item => {
            return (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      // backgroundColor: colors.secondary,
                      flex: 1,
                      padding: 10,
                      color: colors.white,
                      fontSize: windowWidth / 20,
                      fontFamily: fonts.secondary[600],
                    }}>
                    {item.kegiatan}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                    }}>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontSize: windowWidth / 25,
                        fontFamily: fonts.secondary[600],
                      }}>
                      Nilai
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: windowWidth / 20,
                        margin: 5,
                        fontFamily: fonts.secondary[600],
                      }}>
                      {item.nilai}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontSize: windowWidth / 20,
                        margin: 5,
                        fontFamily: fonts.secondary[400],
                      }}>
                      {item.deskripsi}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
      {/* Ekstrakurikuler */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
