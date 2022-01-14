import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Picker,
} from 'react-native';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowHeight, windowWidth} from '../../utils/fonts';
import {MyPicker, MyGap, MyInput, MyButton} from '../../components';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import {showMessage} from 'react-native-flash-message';
import {Icon} from 'react-native-elements';

export default function PencapaianTambah({navigation, route}) {
  const item = route.params;
  const [user, setUser] = useState({});
  const [kelas, setKelas] = useState([]);
  const [id_kelas, setIdKelas] = useState('');
  const [pertemuan, setPertemuan] = useState([]);
  const [langkah, setLangkah] = useState('');
  const [group, setGroup] = useState('');
  const [dataJam, setDataJam] = useState([]);
  const [catatan, setCatatan] = useState('');
  const [materi, setMateri] = useState('');

  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);

  const [santri, setSantri] = useState('');
  const [absensi, setAbsensi] = useState('1');

  const [juz_dari, setDariJuz] = useState('1');
  const [hal_dari, setDariHal] = useState('1');
  const [baris_dari, setDariBar] = useState('1');
  const [juz_sd, setSampaiJuz] = useState('1');
  const [hal_sd, setSampaiHal] = useState('1');
  const [baris_sd, setSampaiBar] = useState('1');

  const [juz_dari2, setDariJuz2] = useState('1');
  const [hal_dari2, setDariHal2] = useState('1');
  const [baris_dari2, setDariBar2] = useState('1');
  const [juz_sd2, setSampaiJuz2] = useState('1');
  const [hal_sd2, setSampaiHal2] = useState('1');
  const [baris_sd2, setSampaiBar2] = useState('1');

  const simpan = () => {
    axios
      .post(
        'https://www.pesantrenkhairunnas.sch.id/api/add_petemuan_detail.php',
        {
          fid_hasil_belajar: item.id_hasil_belajar,
          fid_santri: santri,
          juz_dari: juz_dari,
          hal_dari: hal_dari,
          baris_dari: baris_dari,
          juz_sd: juz_sd,
          hal_sd: hal_sd,
          baris_sd: baris_sd,
          juz_dari2: juz_dari2,
          hal_dari2: hal_dari2,
          baris_dari2: baris_dari2,
          juz_sd2: juz_sd2,
          hal_sd2: hal_sd2,
          baris_sd2: baris_sd2,
          fid_cabang: user.id_cabang,
          absensi: absensi,
        },
      )
      .then(res => {
        console.warn(res.data);
        showMessage({
          type: 'success',
          message: 'Selamat data berhasil ditambah',
        });
        navigation.goBack();
      });
  };

  useEffect(() => {
    getData('user').then(usr => {
      setUser(usr);
      console.log(usr);

      axios
        .post(
          'https://www.pesantrenkhairunnas.sch.id/api/get_kelas_santri.php',
          {
            id: item.id_kelas,
            fid_hasil_belajar: item.id_hasil_belajar,
          },
        )
        .then(resp => {
          console.log('hasi; get kelas', resp.data);

          setKelas(resp.data);
        });
    });
  }, []);
  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#CACACA',
          }}>
          <View>
            <Text style={{fontFamily: fonts.secondary[800]}}>
              Tahun Periode
            </Text>
            <Text>{item.nama_periode}</Text>
            <Text>{item.tahun}</Text>
            <View
              style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Text style={{fontFamily: fonts.secondary[800]}}>
                Total Santri
              </Text>
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
        <MyGap jarak={5} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon
            type="ionicon"
            name="person-outline"
            color={colors.primary}
            size={16}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              left: 10,
              fontSize: 16,
            }}>
            Pilih Nama Santri
          </Text>
        </View>
        <Picker
          onValueChange={val => {
            // console.warn('pertemuan', val);
            setSantri(val);
          }}>
          <Picker.Item value={0} label="Silahkan Pilih Santri" />
          {kelas.map(item => {
            return (
              <Picker.Item value={item.fid_santri} label={item.nama_lengkap} />
            );
          })}
        </Picker>
        <MyGap jarak={5} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon
            type="ionicon"
            name="person-outline"
            color={colors.primary}
            size={16}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              left: 10,
              fontSize: 16,
            }}>
            Absensi
          </Text>
        </View>
        <Picker
          onValueChange={val => {
            // console.warn('pertemuan', val);
            setAbsensi(val);
          }}>
          <Picker.Item value={1} label="Hadir" />
          <Picker.Item value={2} label="Ijin" />
          <Picker.Item value={3} label="Sakit" />
          <Picker.Item value={4} label="Alpa" />
        </Picker>

        {/* Hafalan Baru */}
        <MyGap jarak={5} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.secondary,
            borderBottomWidth: 1,
            borderBottomColor: colors.secondary,
          }}>
          HAFALAN BARU
        </Text>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.primary,
          }}>
          {/* dari */}

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
              textAlign: 'center',
              backgroundColor: colors.secondary,
            }}>
            DARI
          </Text>
          {/* juz */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Juz
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariJuz(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
            <Picker.Item value={24} label="24" />
            <Picker.Item value={25} label="25" />
            <Picker.Item value={26} label="26" />
            <Picker.Item value={27} label="27" />
            <Picker.Item value={28} label="28" />
            <Picker.Item value={29} label="29" />
            <Picker.Item value={30} label="30" />
          </Picker>
          <MyGap jarak={5} />
          {/* halaman */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Halaman
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariHal(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
          </Picker>
          <MyGap jarak={5} />
          {/* baris */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Baris
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariBar(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
          </Picker>
          <MyGap jarak={5} />

          {/* sampai */}

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
              textAlign: 'center',
              backgroundColor: colors.secondary,
            }}>
            SAMPAI
          </Text>
          {/* juz */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Juz
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiJuz(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
            <Picker.Item value={24} label="24" />
            <Picker.Item value={25} label="25" />
            <Picker.Item value={26} label="26" />
            <Picker.Item value={27} label="27" />
            <Picker.Item value={28} label="28" />
            <Picker.Item value={29} label="29" />
            <Picker.Item value={30} label="30" />
          </Picker>
          <MyGap jarak={5} />
          {/* halaman */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Halaman
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiHal(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
          </Picker>
          <MyGap jarak={5} />
          {/* baris */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Baris
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiBar(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
          </Picker>
          <MyGap jarak={5} />
        </View>
        {/*  Murajaah */}
        <MyGap jarak={20} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.secondary,
            borderBottomWidth: 1,
            borderBottomColor: colors.secondary,
          }}>
          MURAJAAH
        </Text>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.primary,
          }}>
          {/* dari */}

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
              textAlign: 'center',
              backgroundColor: colors.secondary,
            }}>
            DARI
          </Text>
          {/* juz */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Juz
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariJuz2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
            <Picker.Item value={24} label="24" />
            <Picker.Item value={25} label="25" />
            <Picker.Item value={26} label="26" />
            <Picker.Item value={27} label="27" />
            <Picker.Item value={28} label="28" />
            <Picker.Item value={29} label="29" />
            <Picker.Item value={30} label="30" />
          </Picker>
          <MyGap jarak={5} />
          {/* halaman */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Halaman
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariHal2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
          </Picker>
          <MyGap jarak={5} />
          {/* baris */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Baris
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setDariBar2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
          </Picker>
          <MyGap jarak={5} />

          {/* sampai */}

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
              textAlign: 'center',
              backgroundColor: colors.secondary,
            }}>
            SAMPAI
          </Text>
          {/* juz */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Juz
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiJuz2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
            <Picker.Item value={24} label="24" />
            <Picker.Item value={25} label="25" />
            <Picker.Item value={26} label="26" />
            <Picker.Item value={27} label="27" />
            <Picker.Item value={28} label="28" />
            <Picker.Item value={29} label="29" />
            <Picker.Item value={30} label="30" />
          </Picker>
          <MyGap jarak={5} />
          {/* halaman */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Halaman
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiHal2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
          </Picker>
          <MyGap jarak={5} />
          {/* baris */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon
              type="ionicon"
              name="person-outline"
              color={colors.primary}
              size={12}
            />
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                left: 10,
                fontSize: 12,
              }}>
              Baris
            </Text>
          </View>
          <Picker
            onValueChange={val => {
              // console.warn('pertemuan', val);
              setSampaiBar2(val);
            }}>
            <Picker.Item value={1} label="1" />
            <Picker.Item value={2} label="2" />
            <Picker.Item value={3} label="3" />
            <Picker.Item value={4} label="4" />
            <Picker.Item value={5} label="5" />
            <Picker.Item value={6} label="6" />
            <Picker.Item value={7} label="7" />
            <Picker.Item value={8} label="8" />
            <Picker.Item value={9} label="9" />
            <Picker.Item value={10} label="10" />
            <Picker.Item value={11} label="11" />
            <Picker.Item value={12} label="12" />
            <Picker.Item value={13} label="13" />
            <Picker.Item value={14} label="14" />
            <Picker.Item value={15} label="15" />
            <Picker.Item value={16} label="16" />
            <Picker.Item value={17} label="17" />
            <Picker.Item value={18} label="18" />
            <Picker.Item value={19} label="19" />
            <Picker.Item value={20} label="20" />
            <Picker.Item value={21} label="21" />
            <Picker.Item value={22} label="22" />
            <Picker.Item value={23} label="23" />
            <Picker.Item value={24} label="24" />
            <Picker.Item value={25} label="25" />
            <Picker.Item value={26} label="26" />
            <Picker.Item value={27} label="27" />
            <Picker.Item value={28} label="28" />
            <Picker.Item value={29} label="29" />
            <Picker.Item value={30} label="30" />
          </Picker>
          <MyGap jarak={5} />
        </View>
        <MyGap jarak={10} />
        <MyButton onPress={simpan} title="SIMPAN DATA" warna={colors.primary} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
