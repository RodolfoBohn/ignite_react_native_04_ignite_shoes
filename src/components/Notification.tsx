import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';
import * as Linking from 'expo-linking'

type Props = {
  data: any
  onClose: () => void;
}

interface AditionalDataProps {
  route?: 'details',
  product_id?: 'string'
}

export function Notification({ data, onClose }: Props) {
  // const navigation = useNavigation()
  function handlePress() {
    //Exemplo de redirecionamento de App em foreground a partir de aditional data
    // const {route, product_id} = data.additionalData as AditionalDataProps
    // if(route && product_id) {
    //   navigation.navigate(route, {productId: product_id})
    //   onClose()
    // }

    //Exemplo de redirecionamento com deeplink
    //Tipagem nao ta ok e nao ta trazendo o lauchURL
    if(data.launchURL) {
      Linking.openURL(data.launchURL)
    }
    
    onClose()
  }

  return (
    <Pressable
      w="full" 
      position="absolute"
      top={0}
      bgColor="gray.200"
      p={4} 
      pt={12}
      onPress={handlePress}
    >
      <HStack 
        justifyContent="space-between" 
        alignItems="center" 
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}