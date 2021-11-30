import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton, MyGap, MyInput} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import LottieView from 'lottie-react-native';

export default function ({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([
    {
      id: 1,
    },
  ]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.log(res);
        setLoading(true);

        axios
          .post('https://pesantrenkhairunnas.sch.id/api/absensi_guru.php', {
            id: res.id_pengajar,
          })
          .then(res => {
            setLoading(false);
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  const MyList = ({lab, val}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#CDCDCD',
          paddingVertical: 3,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {lab}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {val}
          </Text>
        </View>
      </View>
    );
  };

  const [ket, setKet] = useState('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 10,
        padding: 10,
      }}>
      <MyButton
        Icons="add"
        title="INPUT ABSEN"
        warna={colors.secondary}
        onPress={() => navigation.navigate('AbsenGuruTambah', user)}
      />
      <ScrollView
        style={{
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
                elevation: 1,
              }}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: windowWidth / 30,
                    color: colors.primary,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {item.tanggal}
                </Text>
                <Text
                  style={{
                    fontSize: windowWidth / 30,
                    color: colors.black,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {item.fid_tahun_aktif} - {item.bulan}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderTopWidth: 1,
                  borderTopColor: colors.tertiary,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      fontFamily: fonts.secondary[600],
                      color: colors.black,
                    }}>
                    MASUK
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      textAlign: 'center',
                      color: colors.secondary,
                    }}>
                    {item.jam_masuk}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      textAlign: 'center',
                      color: colors.primary,
                    }}>
                    Keterangan
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      textAlign: 'center',
                      color: colors.black,
                    }}>
                    {item.keterangan}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',

                    // flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      fontFamily: fonts.secondary[600],
                      color: colors.black,
                    }}>
                    PULANG
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      textAlign: 'center',
                      color: colors.secondary,
                    }}>
                    {item.jam_keluar}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
