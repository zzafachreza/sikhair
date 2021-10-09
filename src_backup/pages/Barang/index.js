import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap, MyInput} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);
  const [cart, setCart] = useState(false);

  const [jumlah, setJumlah] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
  }, []);

  const addToCart = () => {
    const kirim = {
      id_member: user.id,
      id_barang: item.id,
      nama_barang: item.nama_barang,
      uom: item.uom,
      qty: jumlah,
      harga: item.harga,
      total: jumlah * item.harga,
      foto: item.foto,
    };
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/mytahfidz//api/barang_add.php', kirim)
      .then(res => {
        console.log(res);
        // navigation.navigate('Success2', {
        //   message: 'Berhasil Tambah Keranjang',
        // });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
        setCart(true);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          height: 50,
          // padding: 10,
          paddingRight: 10,
          backgroundColor: colors.primary,

          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="arrow-back" color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
            }}>
            {item.nama_barang}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            padding: 10,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="cart-outline" color={colors.white} />
          {cart && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.danger,
                position: 'absolute',
                right: 10,
                top: 15,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          style={{
            // marginTop: (windowWidth / 5) * -1,
            width: '100%',
            aspectRatio: 1.2,
            // margin: 5,
          }}
          source={{
            uri: item.foto,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: (windowWidth / 15) * -1,
            backgroundColor: colors.white,
            flex: 1,
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {item.tipe}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 15,
              color: colors.black,
            }}>
            {item.nama_barang}
          </Text>
          {/* <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.primary,
            }}>
            Rp. {new Intl.NumberFormat().format(item.harga * jumlah)} / Liter
          </Text> */}
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              jumlah == 1
                ? showMessage({
                    type: 'danger',
                    message: 'Minimal pembelian 1 Pcs',
                  })
                : setJumlah(jumlah - 1);
            }}
            style={{
              backgroundColor: colors.warning,
              width: '30%',
              borderRadius: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon type="ionicon" name="remove" color={colors.white} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
              {jumlah}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              jumlah >= item.stok
                ? showMessage({
                    type: 'danger',
                    message: 'Pembelian melebihi batas !',
                  })
                : setJumlah(jumlah + 1);
            }}
            style={{
              backgroundColor: colors.warning,
              width: '30%',
              borderRadius: 10,
              marginLeft: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="add" color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 12,
            color: colors.black,
            textAlign: 'center',
          }}>
          Rp. {new Intl.NumberFormat().format(item.harga * jumlah)}
        </Text>
      </View>
      <View>
        <MyButton
          fontWeight="bold"
          radius={0}
          title="PROSES PESANAN"
          warna={colors.success}
          onPress={addToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
