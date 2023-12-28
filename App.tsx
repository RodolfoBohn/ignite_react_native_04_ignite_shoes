import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';
import { onesignalInitialize } from './src/utils/onesignal';
import { OneSignal } from 'react-native-onesignal';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    onesignalInitialize()
  }, [])

  useEffect(() => {
    OneSignal.Notifications.addEventListener('click', (event: any) => {
      //pega o id do botao que o user clicou na notificação em background, quando ele tem essa opção disponível
      //o id da pra criar no onesignal
      console.log("E AQUI =>", event.notification)
      console.log("E AQUI o launch =>", event.notification.launchUrl)
      if(event.result.actionId === '1') {
        console.log("Clicou em Ver")
      }
    })


  }, [])
  
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}

      </CartContextProvider>
    </NativeBaseProvider>
  );
}