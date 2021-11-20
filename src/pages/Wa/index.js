import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

export default function Wa() {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      axios
        .post('https://www.pesantrenkhairunnas.sch.id/api/wa.php', {
          id_cabang: res.fid_cabang,
        })
        .then(x => {
          console.log('get data wa', x.data);
          setData(x.data);
        });
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `https://api.whatsapp.com/send?phone=${data.nomor_wa}&text=${data.text_isi}`,
          )
        }
        style={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.success,
          borderRadius: 10,
          padding: 10,
          height: windowHeight / 4,
        }}>
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 12,
          }}>
          {data.nama_admin}
        </Text>
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 12,
          }}>
          {data.nomor_wa}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="logo-whatsapp" color={colors.white} />
          <Text
            style={{
              color: colors.white,
              left: 10,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 12,
            }}>
            Chat Sekarang
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
