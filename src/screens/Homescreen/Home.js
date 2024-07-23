/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  ChevronDownIcon,
  GluestackUIProvider,
  Heading,
  Image,
  Select,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectTrigger,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import {SelectPortal} from '@gluestack-ui/themed';
import {SelectBackdrop} from '@gluestack-ui/themed';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {VolumeManager} from 'react-native-volume-manager';
import SoundPlayer from 'react-native-sound-player';
import {useNetInfo} from '@react-native-community/netinfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import {View} from 'react-native';

const items = [
  {
    id: 0,
    title: 'رادیو آوا ترکیه',
    url: 'http://play.markaradyo.com:8002/stream__',
    image:
      'https://play-lh.googleusercontent.com/2K8kybNmEp7Rl0CCSgHynGI_VHGGAHQPsZ3yG8_mF4XwH8Se6aLS-WpLZNkTAeWbKRo',
  },
  {
    id: 1,
    title: 'رادیو خاطره',
    url: 'https://servidor22-5.brlogic.com:7160/live?source=website',
    image:
      'https://public-rf-upload.minhawebradio.net/175556/featured/5399a0b84a631cf192b583b1dfaff540.jpg',
  },
  {
    id: 2,
    title: 'رادیو سرچشمه',
    url: 'https://sarcheshmeh2-ssl.icdndhcp.com/stream',
    image: 'https://i1.sndcdn.com/avatars-000075012418-tsvy0a-t240x240.jpg',
  },
  {
    id: 3,
    title: 'BBC Radio One',
    url: 'http://lstn.lv/bbc.m3u8?station=bbc_radio_one&bitrate=96000',
    image:
      'https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/BBC_Radio_1_2021.svg/640px-BBC_Radio_1_2021.svg.png&w=640&q=50',
  },
];

export default function Homescreen() {
  const [selected, setSelected] = useState('');
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [image, setImage] = useState(
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/284362464/original/5c0bdf343c073b0bc9215cdbf9089a99d29a7a66/do-online-radio-logo.jpg',
  );
  const [playerState, setPlayerState] = useState('راه اندازی اولیه انجام شد');
  const [volume, setVolume] = useState();
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const netInfo = useNetInfo();
  const {width, height} = useWindowDimensions();

  const Play = () => {
    try {
      setLoadingPlayer(true);
      setLoadingImage(true);
      SoundPlayer.playUrl(selected);
      PlayerState('در حال پخش');
      setLoadingPlayer(false);
      setLoadingImage(false);
      ActivateKeep();
    } catch (error) {
      PlayerState('خطا');
      setLoadingPlayer(false);
      setLoadingImage(false);
    }
  };

  const Stop = () => {
    SoundPlayer.stop();
    PlayerState('پخش متوقف شد');
    setLoadingPlayer(false);
    DeactivateKeep();
  };

  // State: error, stopped, playing, paused, buffering
  const PlayerState = val => {
    setPlayerState(val);
  };

  const PlayerMetadata = () => {};

  const ActivateKeep = () => {
    activateKeepAwake();
  };

  const DeactivateKeep = () => {
    deactivateKeepAwake();
  };

  const DisableNativeVolumeUI = () => {
    VolumeManager.showNativeVolumeUI({enabled: false});
  };

  const initVolume = async () => {
    const {volume} = await VolumeManager.getVolume();
    setVolume(parseInt(volume * 100));
  };

  const onVolumeChange = async val => {
    await VolumeManager.setVolume(val);
  };

  useEffect(() => {
    DisableNativeVolumeUI();
    initVolume();
    VolumeManager.addVolumeListener(result => {
      setVolume(result.music);
    });
  });

  return (
    <GluestackUIProvider config={config}>
      {netInfo.isInternetReachable ? (
        <>
          <Box
            backgroundColor="#212121"
            p={10}
            elevation={7}
            justifyContent="center"
            alignItems="flex-end">
            <Heading color="#fff">رادیونِت</Heading>
          </Box>
          <Box
            flex={1}
            justifyContent="space-around"
            flexDirection="row-reverse"
            backgroundColor="#212121">
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              backgroundColor="#fff"
              borderRadius={15}
              margin={15}>
              {loadingImage === true ? (
                <Spinner size={'large'} />
              ) : (
                <Image
                  source={{uri: image}}
                  alt="Image"
                  width={width / 3}
                  height={height / 1.5}
                  resizeMode="contain"
                />
              )}
            </Box>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              elevation={5}>
              <Box
                backgroundColor="#212121"
                height={80}
                width={width / 2.1}
                justifyContent="center"
                alignItems="center">
                <Select
                  width={width / 2.25}
                  padding={10}
                  onValueChange={value => {
                    Stop();
                    setImage(items[value].image);
                    setSelected(items[value].url);
                  }}>
                  <SelectTrigger
                    variant="outline"
                    height={50}
                    bgColor="#414141">
                    <SelectInput placeholder="انتخاب کنید" color="#fff" />
                    <SelectIcon marginRight={10} as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent
                      width={width / 3}
                      justifyContent="center"
                      alignSelf="center">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {items.map((item, index) => {
                        return (
                          <SelectItem
                            label={item.title}
                            value={index}
                            key={item.id}
                            style={{
                              alignSelf: 'center',
                              width: width / 3,
                              justifyContent: 'center',
                            }}
                          />
                        );
                      })}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box
                flex={1}
                height={height}
                backgroundColor="#212121"
                width={width / 2.1}
                justifyContent="space-between"
                padding={10}
                alignItems="center">
                <Box />
                <Box>
                  {loadingPlayer === true ? (
                    <Box>
                      <Spinner />
                    </Box>
                  ) : (
                    <Box />
                  )}
                  <Text color="#fff">{playerState}</Text>
                </Box>
                <Box alignItems="center" justifyContent="center">
                  <Heading fontSize={12}>Controls</Heading>
                  <Box flexDirection="row" justifyContent="space-around">
                    {playerState === 'در حال پخش' ||
                    playerState === 'در حال بارگذاری' ? (
                      <TouchableOpacity
                        onPress={() => {
                          Stop();
                        }}>
                        <MaterialIcons
                          name="stop-circle"
                          style={{fontSize: 60}}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setLoadingPlayer(true);
                          setPlayerState('در حال بارگذاری');
                          setTimeout(() => {
                            Play();
                          }, 500);
                        }}>
                        <MaterialIcons
                          name="play-circle-outline"
                          style={{fontSize: 60}}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    )}
                  </Box>
                </Box>
                <Box justifyContent="flex-end" alignItems="center">
                  <Slider
                    defaultValue={volume}
                    size="sm"
                    width={width / 3}
                    orientation="horizontal"
                    onChangeEnd={value => {
                      onVolumeChange(value / 100);
                    }}
                    isDisabled={false}
                    isReversed={false}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontSize={12} marginTop={10} color="#fff">
                    صدا
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : netInfo.isConnected ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            شبکه شما متصل است اما داده ای دریافت نشد.{'\n'} مجددا نرم افزار را
            بارگذاری کنید.
          </Text>
          <TouchableOpacity
            onPress={() => {
              RNRestart.Restart();
            }}>
            <Text style={[styles.text, {color: '#fff'}]}>بارگذاری مجدد</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>اینترنت را بررسی کنید</Text>
          <TouchableOpacity
            onPress={() => {
              RNRestart.Restart();
            }}>
            <Text style={[styles.text, {color: '#fff'}]}>بارگذاری مجدد</Text>
          </TouchableOpacity>
        </View>
      )}
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
