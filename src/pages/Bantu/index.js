import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import {Icon} from 'react-native-elements';
import {MyButton, MyGap} from '../../components';

export default function Bantu() {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [rekening, setRekening] = useState([]);
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
      axios
        .post('https://www.pesantrenkhairunnas.sch.id/api/rekening.php', {
          id_cabang: res.fid_cabang,
        })
        .then(y => {
          console.log('get data rekekning', y.data);
          setRekening(y.data);
        });
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          flexDirection: 'row',
          backgroundColor: colors.secondary,
        }}>
        <Icon type="ionicon" name="play-forward" color={colors.white} />
        <Text
          style={{
            color: colors.white,
            left: 10,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>
          TRANSFER MANUAL
        </Text>
      </View>
      <View style={{flex: 1}}>
        {rekening.map(i => {
          return (
            <View
              style={{
                marginVertical: 10,
                borderBottomColor: '#CDCDCD',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 25,
                }}>
                BANK
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 20,
                }}>
                {i.nama_bank}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 25,
                }}>
                ATAS NAMA
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 20,
                }}>
                {i.nama_rekening}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 25,
                }}>
                NOMOR REKEKNING
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 20,
                }}>
                {i.kode_rekening}
              </Text>
            </View>
          );
        })}

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
            height: 70,
          }}>
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
                fontSize: windowWidth / 18,
              }}>
              Konfirmasi Bukti Transfer
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
              }}>
              {data.nama_admin}
            </Text>
            <Text
              style={{
                left: 10,
                color: colors.white,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 20,
              }}>
              {data.nomor_wa}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <MyButton
        onPress={() =>
          Linking.openURL('https://zakatkita.org/bantubiayasekolahdhuafa')
        }
        Icons="play-forward"
        title="VIA ZAKAT ORG"
        warna={colors.success}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
