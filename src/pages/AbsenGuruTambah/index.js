import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {MyPicker, MyGap, MyInput, MyButton} from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Image} from 'react-native';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
export default function AbsenGuruTambah({navigation, route}) {
  const [data, setData] = useState({
    id_pengajar: route.params.id_pengajar,
    tanggal: '',
    keterangan: '',
  });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [TanggalTarget, setTanggalTarget] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // alert(currentDate);

    const Today = new Date(currentDate);
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;
    setData({
      ...data,
      tanggal: today,
    });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const hideMode = currentMode => {
    setShow(false);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const hideDatepicker = () => {
    hideMode('date');
  };

  useEffect(() => {
    const Today = new Date();
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;
    getData('user').then(res => {
      setData({
        ...data,
        tanggal: today,
        // jam_masuk: jam + ':' + menit,
        // jam_keluar: jam + ':' + menit,
      });
    });
  }, []);
  //   kirim ke server

  const kirim = () => {
    console.warn(data);
    // setLoading(true);

    axios
      .post('https://pesantrenkhairunnas.sch.id/api/absensi_guru_add.php', data)
      .then(x => {
        // setLoading(false);
        // alert('Surat Izin Berhasil Di Kirim');
        console.log('respose server', x);
        navigation.goBack();
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          padding: 10,
        }}>
        {/* <MyPicker
          onValueChange={x =>
            setData({
              ...data,
              tipe: x,
            })
          }
          iconname="list"
          label="Pilih Tipe Izin"
          data={[
            {
              label: 'SAKIT',
              value: 'SAKIT',
            },
            {
              label: 'IZIN KHUSUS',
              value: 'IZIN KHUSUS',
            },
            {
              label: 'IZIN BIASA',
              value: 'IZIN BIASA',
            },
            {
              label: 'CUTI',
              value: 'CUTI',
            },
          ]}
        /> */}

        <MyGap jarak={5} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            format="YYYY-MM-DD"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <MyInput
          value={data.tanggal}
          onChangeText={x =>
            setData({
              ...data,
              tipe: x,
            })
          }
          label="Pilih Tanggal"
          iconname="calendar-outline"
          onFocus={showDatepicker}
        />

        <MyGap jarak={5} />
        <MyInput
          value={data.jam_masuk}
          onChangeText={x =>
            setData({
              ...data,
              jam_masuk: x,
            })
          }
          label="Jam Masuk"
          iconname="log-in-outline"
          placeholder="00:00"
          //   keyboardType="number-pad"
        />
        <MyGap jarak={5} />
        <MyInput
          value={data.jam_keluar}
          onChangeText={x =>
            setData({
              ...data,
              jam_keluar: x,
            })
          }
          multiline
          label="Jam Pulang"
          placeholder="00:00"
          iconname="log-out-outline"
        />
        <MyGap jarak={5} />
        <MyInput
          value={data.keterangan}
          onChangeText={x =>
            setData({
              ...data,
              keterangan: x,
            })
          }
          multiline
          label="Keterangan"
          iconname="create-outline"
        />
        <MyGap jarak={5} />

        <MyButton
          onPress={kirim}
          title="SIMPAN ABSENSI GURU"
          iconColor={colors.black}
          Icons="mail-outline"
          warna={colors.tertiary}
          colorText={colors.black}
        />
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
