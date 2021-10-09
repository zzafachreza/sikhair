import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Switch} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyInput, MyGap, MyButton, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import DatePicker from 'react-native-date-picker';
import {Icon} from 'react-native-elements';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Jadwal({navigation, route}) {
  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const today = `${yyyy}-${mm}-${dd}`;

  const [date, setDate] = useState(Today);
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState({
    tanggal: today,
    keterangan: null,
    kode: route.params.kode,
    id_member: route.params.id_member,
  });

  const sendServer = () => {
    console.log('krim', kirim);
    // setLoading(true);

    console.log(kirim);
    axios
      .post('https://zavalabs.com/mytahfidz//api/antar.php', kirim)
      .then(res => {
        console.log('respon atur jadwal', res);
        setTimeout(() => {
          setLoading(false);
          navigation.goBack();
        }, 1000);
        showMessage({
          type: 'success',
          message: 'Data berhasil disimpan !',
        });
      });
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
      }}>
      <ScrollView>
        <View style={{padding: 10, flex: 1}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="calendar-outline"
                color={colors.black}
                size={16}
              />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  left: 10,
                  fontSize: 16,
                }}>
                Tanggal Pengantaran
              </Text>
            </View>
            <DatePicker
              style={{
                backgroundColor: isEnabled ? colors.white : colors.white,
              }}
              mode="date"
              date={date}
              onDateChange={val => {
                const Today = val;
                const dd = String(Today.getDate()).padStart(2, '0');
                const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = Today.getFullYear();
                const today = `${yyyy}-${mm}-${dd}`;

                setKirim({
                  ...kirim,
                  tanggal: today,
                });
              }}
            />
          </View>
          <MyGap jarak={10} />
          <MyInput
            label="Masukan Keterangan"
            iconname="cube-outline"
            value={kirim.keterangan}
            onChangeText={val =>
              setKirim({
                ...kirim,
                keterangan: val,
              })
            }
          />
          <MyGap jarak={10} />

          <MyButton
            title="ATUR JADWAL PENGANTARAN"
            warna={colors.success}
            colorText={colors.white}
            onPress={sendServer}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
