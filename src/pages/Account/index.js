import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import {MyButton} from '../../components';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  const MyMenu = ({label, isi}) => {
    return (
      <View
        style={{
          marginVertical: 5,
        }}>
        <Text style={{fontFamily: fonts.secondary[600]}}>{label}</Text>
        <Text style={{fontFamily: fonts.secondary[400]}}>{isi}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
      }}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: fonts.secondary[600], fontSize: 30}}>
            {user.nisn == null ? 'Data Guru' : 'Data Siswa'}
          </Text>
        </View>
        {user.nis == null ? (
          <View></View>
        ) : (
          <MyMenu label="NISN" isi={user.nis} />
        )}

        <MyMenu
          label="Nama Lengkap"
          isi={user.nis == null ? user.nama_guru : user.nama_lengkap}
        />
        <MyMenu
          label="Jenis Kelamin"
          isi={user.jns_kelamin == 1 ? 'Laki- Laki' : ' Perempuan'}
        />

        <MyMenu label="Tempat Lahir" isi={user.tempat_lahir} />
        <MyMenu label="NIK" isi={user.nik} />

        <MyMenu
          label="alamat"
          isi={user.alamat == null ? user.alamat_jalan : user.alamat}
        />
        {/* <MyMenu label="rt" isi={user.rt} />
        <MyMenu label="rw" isi={user.rw} />
         <MyMenu label="kebutuhan_khusus" isi={user.kebutuhan_khusus} />
        <MyMenu label="dusun" isi={user.dusun} />
        <MyMenu label="kelurahan" isi={user.kelurahan} />
        <MyMenu label="kecamatan" isi={user.kecamatan} />
        <MyMenu label="kota" isi={user.kota} />
        <MyMenu label="kode_pos" isi={user.kode_pos} />
        <MyMenu label="jenis_tinggal" isi={user.jenis_tinggal} />
        <MyMenu label="alat_transportasi" isi={user.alat_transportasi} />
        <MyMenu label="telepon" isi={user.telepon} />
        <MyMenu label="hp" isi={user.hp} />
        <MyMenu label="email" isi={user.email} />
        <MyMenu label="skhun" isi={user.skhun} />
        <MyMenu label="penerima_kps" isi={user.penerima_kps} />
        <MyMenu label="no_kps" isi={user.no_kps} />
        <MyMenu label="foto" isi={user.foto} />
        <MyMenu label="nama_ayah" isi={user.nama_ayah} />
        <MyMenu label="tahun_lahir_ayah" isi={user.tahun_lahir_ayah} />
        <MyMenu label="pendidikan_ayah" isi={user.pendidikan_ayah} />
        <MyMenu label="pekerjaan_ayah" isi={user.pekerjaan_ayah} />
        <MyMenu label="penghasilan_ayah" isi={user.penghasilan_ayah} />
        <MyMenu label="nik_ayah" isi={user.nik_ayah} />
        <MyMenu label="no_telpon_ayah" isi={user.no_telpon_ayah} />
        <MyMenu label="nama_ibu" isi={user.nama_ibu} />
        <MyMenu label="tahun_lahir_ibu" isi={user.tahun_lahir_ibu} />
        <MyMenu label="pendidikan_ibu" isi={user.pendidikan_ibu} />
        <MyMenu label="pekerjaan_ibu" isi={user.pekerjaan_ibu} />
        <MyMenu label="penghasilan_ibu" isi={user.penghasilan_ibu} />
        <MyMenu label="nik_ibu" isi={user.nik_ibu} />
        <MyMenu label="no_telpon_ibu" isi={user.no_telpon_ibu} />
        <MyMenu label="nama_wali" isi={user.nama_wali} />
        <MyMenu label="tahun_lahir_wali" isi={user.tahun_lahir_wali} />
        <MyMenu label="pendidikan_wali" isi={user.pendidikan_wali} />
        <MyMenu label="pekerjaan_wali" isi={user.pekerjaan_wali} />
        <MyMenu label="penghasilan_wali" isi={user.penghasilan_wali} />
        <MyMenu label="no_telpon_wali" isi={user.no_telpon_wali} />
        <MyMenu label="angkatan" isi={user.angkatan} />
        <MyMenu label="status_awal" isi={user.status_awal} />
        <MyMenu label="status_siswa" isi={user.status_siswa} />
        <MyMenu label="tingkat" isi={user.tingkat} />
        <MyMenu label="kode_kelas" isi={user.kode_kelas} />
        <MyMenu label="kode_jurusan" isi={user.kode_jurusan} /> */}
      </ScrollView>
      <MyButton onPress={handleSave} title="LOGOUT" warna={colors.primary} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
