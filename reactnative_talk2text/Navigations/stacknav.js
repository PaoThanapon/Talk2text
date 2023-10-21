import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { Word } from '../screens/Word'

const Stack = createNativeStackNavigator()


const HomeScreen = ({ navigation, route }) => {
    return (
      <Home nav={navigation} route={route} />
    )
}

const WordScreen = ({ navigation, route }) => {
    return (
      <Word nav={navigation} route={route} />
    )
}


export const StackNav = () => {
    return (
      <Stack.Navigator
        screenOptions={
          { headerShown: false }
        }
      >
        <Stack.Screen name="Home" component={WordScreen} />
      </Stack.Navigator>
    )
}