import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
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

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const getDataTransaksi = () => {
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/mytahfidz//api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    });
  };

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataTransaksi();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      getDataTransaksi();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              key={item.id}
              style={{
                margin: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('cek detail', item);
                  navigation.navigate('ListDetail', item);
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 30,
                    }}>
                    Nomor Transaksi - Nama Pelanggan :
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 25,
                      color: colors.black,
                    }}>
                    {item.kode}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 25,
                      color: colors.primary,
                    }}>
                    {item.nama_pemesan}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {item.tanggal}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    {item.status === 'SELESAI' && (
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: windowWidth / 20,
                          color: colors.success,
                          padding: 10,
                        }}>
                        {item.point} Point
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        // borderBottomRightRadius: 10,
                        // backgroundColor: colors.border,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.warning,
                        padding: 10,
                      }}>
                      Rp. {item.total}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {item.status === 'MENUNGGU KONFIRMASI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: '#DEDEDE',
                      color: colors.black,
                      padding: 10,
                      fontSize: windowWidth / 32,
                      fontFamily: fonts.secondary[600],
                    }}>
                    MENUNGGU KONFIRMASI
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      axios
                        .post(
                          'https://zavalabs.com/mytahfidz//api/transaksi_hapus.php',
                          {
                            id_member: item.id_member,
                            kode: item.kode,
                          },
                        )
                        .then(res => {
                          axios
                            .post(
                              'https://zavalabs.com/mytahfidz//api/transaksi.php',
                              {
                                id_member: item.id_member,
                              },
                            )
                            .then(res => {
                              console.log(res.data);
                              setData(res.data);
                            });
                        });
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.danger,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 32,
                      }}>
                      Batalkan Transaksi
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.status === 'CUCIAN SUDAH WANGI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: '#DEDEDE',
                      color: colors.black,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 32,
                    }}>
                    CUCIAN SUDAH WANGI
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Jadwal', item);
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.success,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 32,
                      }}>
                      Atur Jadwal Pengantaran
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.status === 'SELESAI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.success,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    SELESAI
                  </Text>
                </View>
              )}

              {item.status === 'SIAP DI ANTAR' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    CUCIAN SIAP DI ANTAR
                  </Text>
                </View>
              )}

              {item.status === 'KURIR AMBIL CUCIAN' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    KURIR SEDANG MENUJU KE RUMAH ANDA
                  </Text>
                </View>
              )}

              {item.status === 'CUCIAN SAMPAI DI TOKO' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    CUCIAN ANDA SUDAH SAMPAI DI TOKO
                  </Text>
                </View>
              )}

              {item.status === 'CUCIAN SEDANG DI CUCI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    CUCIAN SEDANG DI CUCI
                  </Text>
                </View>
              )}

              {item.status === 'CUCIAN SEDANG DI SETRIKA' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                      fontSize: windowWidth / 32,
                    }}>
                    CUCIAN SEDANG DI SETRIKA
                  </Text>
                </View>
              )}

              {item.status === 'CUCIAN SEDANG DI LABELING' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                    }}>
                    CUCIAN SEDANG DI LABELING
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
