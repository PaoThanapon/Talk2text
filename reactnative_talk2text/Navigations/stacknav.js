import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'

const Stack = createNativeStackNavigator()


const HomeScreen = ({ navigation, route }) => {
    return (
      <Home nav={navigation} route={route} />
    )
}


export const StackNav = () => {
    return (
      <Stack.Navigator
        screenOptions={
          { headerShown: false }
        }
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
}