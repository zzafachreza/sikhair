import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TextInput,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton, MyGap, MyInput} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export default function DataSantri({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([
    {
      id: 1,
    },
  ]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.log(res);

        axios
          .post('https://pesantrenkhairunnas.sch.id/api/data_santri.php', {
            key: '',
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  const MyList = ({lab, val}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#CDCDCD',
          paddingVertical: 3,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {lab}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {val}
          </Text>
        </View>
      </View>
    );
  };

  const [ket, setKet] = useState('');

  const filterData = () => {
    // alert(ket);
    axios
      .post('https://pesantrenkhairunnas.sch.id/api/data_santri.php', {
        key: ket,
      })
      .then(res => {
        console.log('filter', res.data);
        setData(res.data);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 10,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
        }}>
        <TextInput
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 20,
            flex: 1,
          }}
          onChangeText={val => setKet(val)}
          placeholder="masukan kata kunci"
          onSubmitEditing={filterData}
        />
        <TouchableOpacity onPress={filterData}>
          <Icon type="ionicon" name="search" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              key={item.id_santri}
              style={{
                margin: 5,
                elevation: 2,
                backgroundColor: colors.white,
              }}>
              <View
                onPress={() => {
                  // console.log('cek detail', item);
                  // navigation.navigate('ListDetail', item);
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: windowWidth / 30,
                          color: colors.primary,
                        }}>
                        {item.nama_lengkap}
                      </Text>
                    </View>
                  </View>
                  <MyList lab="NIS" val={item.nis} />
                  <MyList
                    lab="Jenis Kelamin"
                    val={item.jns_kelamin == 1 ? 'Laki-laki' : 'Perempuan'}
                  />
                </View>
                {/* slider */}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
