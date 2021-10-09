import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  RefreshControl,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser2 from '../../components/MyCarouser2';
import WebView from 'react-native-webview';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation}) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [point, setPoint] = useState(0);

  const [company, setCompany] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const getDataPoint = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post('https://zavalabs.com/mytahfidz//api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post('https://zavalabs.com/mytahfidz//api/update_token.php', {
            id_member: user.id,
            token: res.token,
          })
          .then(res => {
            console.log('update token', res);
          });
      });
    });
  };

  const DataKategori = ({icon, nama, onPress, img}) => {
    return (
      <TouchableOpacity onPress={onPress} style={{elevation: 2}}>
        <Image
          source={{uri: img}}
          style={{width: 100, height: 100, borderRadius: 10}}
        />
      </TouchableOpacity>
    );
  };

  const GetCompany = () => {
    axios.get('https://zavalabs.com/mytahfidz//api/company.php').then(res => {
      console.log('data company', res.data);
      setCompany(res.data);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataPoint();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    getDataPoint();
  });

  useEffect(() => {
    getDataPoint();
    GetCompany();
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        // backgroundColor: colors.primary,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <View
          style={{
            height: windowHeight / 7,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: windowWidth / 23,
                color: colors.white,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 23,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                width: windowWidth / 5,
                height: windowWidth / 5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/logo.png')}
                style={{
                  width: windowWidth / 6,
                  height: windowWidth / 6,
                }}
              />
            </View>
          </View>
        </View>

        {/* bagian untuk search */}

        <View
          style={{
            padding: 10,
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,
                fontSize: windowWidth / 25,
              }}>
              SMP TAHFIDZ ENTREPRENEUR
            </Text>
          </View>
        </View>
        <MyCarouser2 />

        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <DataKategori
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-HJ-KHAIRUNNAS.jpg"
              onPress={() => navigation.navigate('Daftar')}
            />
            <DataKategori
              onPress={() => navigation.navigate('Info')}
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-TK-KB-KHAIRUNNAS.jpg"
            />
            <DataKategori
              onPress={() => navigation.navigate('Tahsin')}
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-SD-KHAIRUNNAS.jpg"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
              marginBottom: 15,
            }}>
            <DataKategori
              onPress={() => navigation.navigate('Zakat')}
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-SMP-KHAIRUNNAS.jpg"
            />
            <DataKategori
              onPress={() => navigation.navigate('Waqaf')}
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-SMA-KHAIRUNNAS.jpg"
            />
            <DataKategori
              onPress={() => navigation.navigate('Buku')}
              img="https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2019/12/ICON-TOMBOL-KEPQ.jpg"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            padding: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              // marginHorizontal: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,

              backgroundColor: colors.secondary,
              flexDirection: 'row',
            }}>
            <Icon
              type="ionicon"
              name="logo-whatsapp"
              size={30}
              color={colors.white}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.white,
                fontSize: windowWidth / 25,
                left: 10,
              }}>
              Chat WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
