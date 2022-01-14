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
import {Icon} from 'react-native-elements';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {MyGap} from '../../components';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = () => {
    axios
      .get('https://pesantrenkhairunnas.sch.id/api/pendidikan.php')
      .then(res => {
        setData(res.data);
      });
  };

  const renderItem = ({item}) => (
    <>
      <View style={{padding: 10, backgroundColor: colors.secondary}}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.jam_mulai} - {item.jam_selesai}
        </Text>
      </View>

      <View
        //   onPress={() => navigation.navigate('Pinjam', item)}
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'white',

          // height: 80,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 35,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.nama_guru}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 28,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.namamatapelajaran}
          </Text>
        </View>
        <View
          // onPress={() => {
          //   navigation.navigate('DataTugasDetail', item);
          // }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // flex: 1,
          }}>
          <Icon type="ionicon" name="school-outline" color={colors.primary} />
        </View>
      </View>
    </>
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <MyGap jarak={10} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
