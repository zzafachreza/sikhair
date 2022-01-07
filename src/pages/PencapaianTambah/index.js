import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowHeight} from '../../utils/fonts';
import {MyPicker, MyGap, MyInput, MyButton} from '../../components';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {showMessage} from 'react-native-flash-message';

export default function PencapaianTambah({navigation, route}) {
  const [user, setUser] = useState({});
  const [kelas, setKelas] = useState([]);
  const [id_kelas, setIdKelas] = useState('');
  const [pertemuan, setPertemuan] = useState([]);
  const [langkah, setLangkah] = useState('');
  const [group, setGroup] = useState('');

  const [catatan, setCatatan] = useState('');
  const [materi, setMateri] = useState('');

  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);

  const simpan = () => {
    axios
      .post('https://www.pesantrenkhairunnas.sch.id/api/add_pertemuan.php', {
        id_pengajar: user.fid_keterangan,
        langkah: langkah,
        group: group,
        materi: materi,
        catatan: catatan,
      })
      .then(res => {
        console.warn(res.data);
        showMessage({
          type: 'success',
          message: 'Selamat data berhasil ditambah',
        });
        navigation.goBack();
      });
  };

  useEffect(() => {
    getData('user').then(usr => {
      setUser(usr);
      console.log(usr);

      axios
        .post('https://www.pesantrenkhairunnas.sch.id/api/get_kelas.php', {
          fid_pengajar: usr.fid_keterangan,
        })
        .then(resp => {
          console.log('hasi; get kelas', resp.data);

          setKelas(resp.data);
        });
    });
  }, []);
  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView>
        <Text
          style={{
            fontSize: windowHeight / 50,
            fontFamily: fonts.secondary[400],
            color: colors.black,
          }}>
          Nama Lembaga
        </Text>
        <Text
          style={{
            fontSize: windowHeight / 40,
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {user.nama_cabang}
        </Text>
        <Text
          style={{
            fontSize: windowHeight / 50,
            fontFamily: fonts.secondary[400],
            color: colors.black,
          }}>
          Nama Asli
        </Text>
        <Text
          style={{
            fontSize: windowHeight / 40,
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {user.nama_asli}
        </Text>
        <MyGap jarak={5} />
        <MyPicker
          onValueChange={val => {
            setIdKelas(val);
            console.warn('id_kelas', val);
            axios
              .post(
                'https://www.pesantrenkhairunnas.sch.id/api/get_pertemuan.php',
                {
                  id_kelas: val,
                },
              )
              .then(res => {
                setPertemuan(res.data);
              });
          }}
          iconname="home-outline"
          label="Pilih Kelas"
          data={kelas}
        />
        <MyGap jarak={5} />
        <MyPicker
          onValueChange={val => {
            console.warn('pertemuan', val);
            setGroup(val);
          }}
          iconname="people-outline"
          label="Pilih Pertemuan"
          data={pertemuan}
        />
        <MyGap jarak={5} />
        <MyInput
          label="Materi Kelas"
          iconname="book-outline"
          onChangeText={val => setMateri(val)}
        />

        <MyGap jarak={5} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={isSelected}
            onValueChange={() => {
              if (isSelected) {
                setSelection(false);
                setLangkah(0);
              } else {
                setSelection(true);
                setLangkah(1);
              }
            }}
          />
          <Text>Pembukaan, Doa, Tahsin, Tahfidz, Penutup</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={isSelected2}
            onValueChange={() => {
              if (isSelected2) {
                setSelection2(false);
                setLangkah(langkah - 1);
              } else {
                setSelection2(true);
                setLangkah(langkah + 0.5);
              }
            }}
          />
          <Text>Pembukaan, Doa, Tahsin, Murojaah, Penutup</Text>
        </View>
        <MyGap jarak={5} />
        <MyInput
          label="Catatan"
          iconname="create-outline"
          onChangeText={val => setCatatan(val)}
        />
        <MyGap jarak={10} />
        <MyButton onPress={simpan} title="SIMPAN DATA" warna={colors.primary} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
