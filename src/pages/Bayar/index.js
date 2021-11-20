import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import DatePicker from 'react-native-date-picker';
import {windowWidth, fonts} from '../../utils/fonts';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

export default function Bayar({navigation, route}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const simpan = () => {
    const kirim = {
      id: route.params.id_rinc_infaq_santri,
      tanggal_bayar: date,
    };

    console.log(kirim);
    axios
      .post('https://pesantrenkhairunnas.sch.id/api/update_bayar.php', kirim)
      .then(res => {
        console.log(res);
        // setData(res.data);
        navigation.replace('MainApp');
        showMessage({
          message: 'Selamat Berhasil disimpan !',
          type: 'success',
        });
      });
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <Text
        style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          textAlign: 'center',
          marginBottom: 10,
          color: colors.black,
        }}>
        Pembayaran Untuk {route.params.bulan}
      </Text>
      <Text
        style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
          color: colors.primary,
        }}>
        Tanggal Bayar
      </Text>
      {/* <MyButton
        onPress={() => setOpen(true)}
        title="Pilih Tanggal Bayar"
        Icons="calendar"
        warna={colors.primary}
      /> */}
      <DatePicker
        // modal
        is24Hour={false}
        // open={open}
        onDateChange={setDate}
        date={date}
        mode="date"
        style={{width: windowWidth}}
      />
      <MyGap jarak={20} />
      <Text
        style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 15,
          textAlign: 'center',
          color: colors.black,
        }}>
        Rp. {route.params.komitmen}
      </Text>
      <MyGap jarak={20} />
      <MyButton
        onPress={simpan}
        title="Saya Sudah Bayar"
        Icons="shield-checkmark-outline"
        warna={colors.primary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
