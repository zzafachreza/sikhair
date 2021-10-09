import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {getData, storeData} from '../../utils/localStorage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function EditProfile({navigation, route}) {
  navigation.setOptions({
    title: 'Edit Profile',
  });

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama_lengkap: null,
    email: null,
    password: null,
    tlp: null,
    alamat: null,
  });

  const options = {
    includeBase64: true,
    quality: 0.5,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            break;
        }
      }
    });
  };

  useEffect(() => {
    getData('user').then(res => {
      setData(res);
      console.log(res);
    });
    console.log('test edit');
  }, []);

  const simpan = () => {
    setLoading(true);
    console.log('kirim edit', data);
    axios
      .post('https://zavalabs.com/bigetronesports/api/profile.php', data)
      .then(res => {
        console.log(res);
        storeData('user', res.data);
        setLoading(false);
        showMessage({
          type: 'success',
          message: 'Data bershasil diupdate..',
        });

        navigation.replace('MainApp');

        // console.log(err[0]);
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={styles.page}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View>
            <View
              style={{
                borderWidth: 2,
                borderColor: colors.primary,

                // backgroundColor: colors.secondary,
                width: 120,
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 60,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri:
                    data.foto == ''
                      ? 'https://ayokulakan.com/img/no-images.png'
                      : data.foto,
                }}
                style={{width: 120, height: 120}}
              />
            </View>
            <MyGap jarak={5} />
            <MyButton
              title="Change Photo"
              Icons="cloud-upload-outline"
              iconColor={colors.black}
              colorText={colors.black}
              // warna={colors.secondary}
              onPress={() => getGallery(1)}
            />
          </View>
          <View
            style={{
              flex: 1,
              // alignItems: 'flex-end',
              padding: 10,
            }}>
            <MyButton
              warna={colors.primary}
              title="SAVE"
              Icons="log-in"
              onPress={simpan}
            />
          </View>
        </View>

        <MyGap jarak={20} />
        <MyInput
          label="Nama Lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Bio"
          iconname="newspaper-outline"
          value={data.bio}
          onChangeText={value =>
            setData({
              ...data,
              bio: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Gender"
          iconname="male-female"
          value={data.gender}
          onChangeText={value =>
            setData({
              ...data,
              gender: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Tanggal Lahir"
          iconname="calendar-outline"
          value={data.tanggal_lahir}
          onChangeText={value =>
            setData({
              ...data,
              tanggal_lahir: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="map-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Telepon"
          iconname="call-outline"
          keyboardType="number-pad"
          value={data.tlp}
          onChangeText={value =>
            setData({
              ...data,
              tlp: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Password"
          placeholder="Kosongkan jika tidak diubah"
          iconname="key-outline"
          secureTextEntry
          value={data.newpassword}
          onChangeText={value =>
            setData({
              ...data,
              newpassword: value,
            })
          }
        />
        <MyGap jarak={20} />
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
