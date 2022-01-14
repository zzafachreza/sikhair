import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';
import {MyButton} from '../../components';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const item = route.params;
  const [user, setUser] = useState({});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPencapaianTahfidz();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getPencapaianTahfidz();
  }, []);

  const getPencapaianTahfidz = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post(
          'https://pesantrenkhairunnas.sch.id/api/hasil_belajar_detail.php',
          {
            fid_hasil_belajar: route.params.id_hasil_belajar,
          },
        )
        .then(resp => {
          console.warn(resp.data);
          setData(resp.data);
        });
    });
  };

  const renderItem = ({item}) => (
    <View
      onPress={() => console.error(item.id_detail_hasil_belajar)}
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
          {item.nama_lengkap}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_hari_belajar}
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
            Hafalan Dari
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.secondary,
            }}>
            {item.juz_dari}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.primary,
            }}>
            {item.absensi}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.black,
            }}>
            {item.nama_waktu_belajar}
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
            Hafalan Sampai
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.secondary,
            }}>
            {item.juz_sampai}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('SIKHAIR', 'Apakah Anda yakin akan hapus ini ?', [
            {
              text: 'Cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                axios
                  .post(
                    'https://pesantrenkhairunnas.sch.id/api/delete_santri_hasil_belajar.php',
                    {
                      id: item.id_detail_hasil_belajar,
                      id_hasil_belajar: item.fid_id_hasil_belajar,
                    },
                  )
                  .then(res => {
                    console.error(res.data);
                    getPencapaianTahfidz();
                  });
              },
            },
          ]);
        }}
        style={{
          padding: 10,
          backgroundColor: colors.danger,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: fonts.secondary[600], color: colors.white}}>
          Hapus
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
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
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>{user.nama_lengkap}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <View>
          <Text style={{fontFamily: fonts.secondary[800]}}>Tahun Periode</Text>
          <Text>{item.nama_periode}</Text>
          <Text>{item.tahun}</Text>
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={{fontFamily: fonts.secondary[800]}}>Total Santri</Text>
            <Text>{item.total_santri}</Text>
          </View>
        </View>
        <View>
          <Text style={{fontFamily: fonts.secondary[800]}}>Hari dan Jam</Text>
          <Text>{item.nama_hari_belajar}</Text>
          <Text>{item.nama_waktu_belajar}</Text>
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={{fontFamily: fonts.secondary[800]}}>
              Total Santri Hadir
            </Text>
            <Text>
              {item.jml_santri_hadir === null ? 0 : item.jml_santri_hadir}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 10,
        }}>
        <MyButton
          onPress={() => navigation.navigate('PencapaianDetailTambah', item)}
          title="Tambahkan Santri"
          warna={colors.primary}
          Icons="person-add-outline"
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
