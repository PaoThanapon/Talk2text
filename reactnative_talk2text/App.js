import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNav } from './Navigations/stacknav' 
import { Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
