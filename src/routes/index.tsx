import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import  {OneSignal, OSNotification}  from 'react-native-onesignal';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  //Configuração deeplink na rota
  //exemplo de URL baseada neste linking: igniteshoesapp://details/10
  const linking: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['com.rocketseat.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'], 
    config: {
      screens: {
        details: {
          path: 'details/:productId', 
          parse: {
            productId: (productId:string) => productId
          }
        }
      }
    }
  }

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
      const response = event.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  },[])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification && (
          <Notification 
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
    </NavigationContainer>
  );
}