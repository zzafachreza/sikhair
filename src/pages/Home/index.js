import React, {useState, useEffect, useRef} from 'react';
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
  Button,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyDrawer from '../../components/MyDrawer';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import Drawer from 'react-native-drawer';
import {MyButton} from '../../components';
import MyCarouser2 from '../../components/MyCarouser2';
import RenderHtml from 'react-native-render-html';

export default function Home({navigation}) {
  const _drawer = useRef();

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  const [berita, setBerita] = useState({});
  const [bayar, setBayar] = useState('0');

  useEffect(() => {
    getData('user').then(res => {
      console.error('get user master nisn', res);
      setUser(res);
      axios
        .post('https://pesantrenkhairunnas.sch.id/api/get_bayar.php', {
          id: res.id_santri,
        })
        .then(x => {
          console.error('get Bayarz', x.data);
          setBayar(x.data);
        });
      getData('token').then(res => {
        // console.log('data token,', res);
        setToken(res.token);
      });
    });
    axios
      .post('https://pesantrenkhairunnas.sch.id/api/berita_terakhir.php')
      .then(res => {
        console.log('updates berita', res);
        setBerita(res.data);
      });
  }, []);

  const DataKategori = ({icon, nama, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.white,
          padding: 6,
          borderRadius: 20,
          width: windowWidth / 5,
          elevation: 5,
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.primary}
            size={windowWidth / 10}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: windowWidth / 42,
              textAlign: 'center',
            }}>
            {nama}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
    <Drawer
      tweenHandler={ratio => ({
        main: {opacity: (2 - ratio) / 2},
      })}
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      ref={_drawer}
      content={<MyDrawer closeDrawer={() => _drawer.current.close()} />}>
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: colors.primary,
        }}>
        <ScrollView>
          <View
            style={{
              height: 100,
              padding: 10,
              backgroundColor: colors.primary,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, paddingTop: 15, flexDirection: 'row'}}>
              <View>
                {/* <View
                  style={{
                    width: 60,
                    // backgroundColor: colors.border,
                    borderWidth: 2,
                    borderColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    borderRadius: 60,
                    marginBottom: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{
                      uri:
                        user.foto == ''
                          ? 'https://zavalabs.com/nogambar.jpg'
                          : user.foto,
                    }}
                    style={{width: 60, height: 60}}
                  />
                </View> */}
              </View>
              <View style={{flex: 1, paddingLeft: 10}}>
                <Text
                  style={{
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {user.nama_lengkap}
                </Text>
                <Text
                  style={{
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    fontFamily: fonts.secondary[400],
                  }}>
                  {user.kode}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => _drawer.current.open()}
              style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="menu-outline"
                size={35}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* berita */}
          <View
            style={{
              height: windowHeight / 5,
              padding: 20,
              marginHorizontal: 10,
              borderRadius: 20,
              backgroundColor: colors.white,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: windowWidth / 20,
                color: colors.black,
                fontFamily: fonts.secondary[600],
              }}>
              {berita.judul}
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {berita.tanggal}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                paddingTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Artikel', berita)}
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: windowWidth / 30,
                    color: colors.primary,
                    fontFamily: fonts.secondary[800],
                  }}>
                  Baca Selengkapnya
                </Text>
              </TouchableOpacity>
              <Icon
                type="ionicon"
                name="chevron-forward-circle"
                size={25}
                color={colors.primary}
              />
            </View>
          </View>
          {/* berita */}

          {/* menu */}
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              {user.kode == 'GURU' ? (
                <DataKategori
                  onPress={() => navigation.navigate('Pencapaian', user)}
                  icon="folder"
                  nama="Pencapaian Tahfidz"
                />
              ) : (
                <DataKategori
                  onPress={() => navigation.navigate('NilaiAkademis', user)}
                  icon="bookmarks"
                  nama="Nilai Akademik"
                />
              )}
              <DataKategori
                onPress={() => navigation.navigate('NilaiTahfidz', user)}
                icon="information-circle"
                nama="Nilai Tahfidz"
              />

              {user.kode == 'GURU' ? (
                <DataKategori
                  onPress={() => navigation.navigate('AbsenGuru', user)}
                  icon="logo-youtube"
                  nama="Absensi Guru"
                />
              ) : (
                <DataKategori
                  onPress={() => navigation.navigate('AbsensiSiswa', user)}
                  icon="logo-youtube"
                  nama="Absensi Murid"
                />
              )}

              <DataKategori
                onPress={() => navigation.navigate('DataPendidikan')}
                icon="grid"
                nama="Data Pendidikan"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <DataKategori
                onPress={() => navigation.navigate('DataTugas', user)}
                icon="file-tray-stacked"
                nama="Daftar Tugas"
              />
              <DataKategori
                onPress={() => navigation.navigate('DataBayar', user)}
                icon="card"
                nama="Riwayat Pembayaran"
              />
              <DataKategori
                onPress={() => navigation.navigate('BantuWaqaf')}
                icon="wallet"
                nama="Waqaf Pesantren"
              />
              <DataKategori
                onPress={() => navigation.navigate('Bantu')}
                icon="people"
                nama="Bantu Santri Yatim/Dhuafa"
              />
            </View>
          </View>
          {/* menu */}

          {/* Bayar */}
          {user.nis && (
            <View
              style={{
                height: windowHeight / 5,
                padding: 20,
                margin: 10,
                marginBottom: 20,
                borderRadius: 20,
                backgroundColor: colors.white,
              }}>
              <Text
                style={{
                  fontSize: windowWidth / 30,
                  color: colors.black,
                  fontFamily: fonts.secondary[600],
                }}>
                Total Kewajiban Belum Bayar
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 10,
                      color: colors.black,
                      fontFamily: fonts.secondary[600],
                    }}>
                    {bayar}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://zakatkita.org/bayarspphj')
                  }
                  style={{
                    justifyContent: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 30,
                    backgroundColor: colors.primary,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 32,
                      color: colors.white,
                      fontFamily: fonts.secondary[600],
                    }}>
                    Bayar Sekarang
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DataBayar', user)}
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth / 30,
                      color: colors.primary,
                      fontFamily: fonts.secondary[800],
                    }}>
                    Lihat Selengkapnya
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="ionicon"
                  name="chevron-forward-circle"
                  size={25}
                  color={colors.primary}
                />
              </View>
            </View>
          )}
          {/* Bayar */}

          {/* banner */}

          <MyCarouser2 />

          {/* banner */}
        </ScrollView>
      </ImageBackground>
    </Drawer>
  );
}
