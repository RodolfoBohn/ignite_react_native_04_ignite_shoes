import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';

function onesignalInitialize() {
 
    OneSignal.initialize("YOUR_KEY");
    OneSignal.Notifications.requestPermission(true);
  
 
}

function addCartTag(cartCount: string) {
  OneSignal.User.addTag('cart_items_count', cartCount)
}

export { onesignalInitialize, addCartTag };