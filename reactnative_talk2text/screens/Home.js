import React , { useEffect , useState } from 'react';
import { View, Text , TouchableOpacity , ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice'
import { Image } from 'react-native';


export const Home = () => {
  const [started , setStarted] = useState('')
  const [ended , setEnded] = useState('')
  const [results , setResults] = useState([])

  const [lightOn, setLightOn] = useState(false);
  const [lightOff, setLightOff] = useState(false);

  useEffect(()=> {
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults


    return ()=> {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  },[])

  const  onSpeechStart=(e)=> {
    console.log(e)
    setStarted('✔️')
  }

  const  onSpeechEnd=(e)=> {
    console.log(e)
    setEnded('✔️')
  }

  // const  onSpeechResults = e => {
  //   console.log(e)
  //   setResults(e.value)
  // }

  const onSpeechResults = (e) => {
    console.log(e);
    setResults(e.value);
  
    if (e.value.includes("light on")) {
      setLightOn(true);
  
      setTimeout(() => {
        setLightOn(false);
      }, 2000);
    }
    if (e.value.includes("light off")) {
      setLightOff(true); 
  
      setTimeout(() => {
        setLightOff(false);
      }, 2000);
    }
  };
  

  const startRec=async()=> {
    try {
      await Voice.start('en-US');
      setStarted('')
      setEnded('')
      setResults([])
    } catch(err){
      console.log('startRec',err)
    }
  }

  const stopRec=async()=> {
    try {
      await Voice.stop();
      await Voice.destroy()
      setStarted('')
      setEnded('')
      setResults([])
    } catch(err){
      console.log('startRec',err)
    }
  }

  return (
    <View style={{flex:1}}>
      <Text style={{alignSelf:'center',marginTop:20}}>Voice To Text Recognizing</Text>
      <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'20%',backgroundColor:'black'}}>
        <View style={{backgroundColor:'gray',width:'50%',height:'20%'}}>
          <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} onPress={()=>{
            startRec()
          }} >
            <Text>Press</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',marginTop:50,justifyContent:'space-evenly'}}>
        <Text>Started {started} </Text>
        <Text>Ended {ended} </Text>
      </View>
      <ScrollView horizontal style={{alignSelf:'center',marginTop:50}}>
        {
          results.map(item=> {
            return (
              <Text style={{textAlign:'center'}}>{item}</Text>
            )
          })
        }
      </ScrollView>
      <View style={{width:'100%',height:'50%'}}>
        {lightOn && <Image style={{width:'100%',height:'100%'}} source={require('../picture/lighton.jpg')} />}
        {lightOff && <Image style={{width:'100%',height:'100%'}} source={require('../picture/lightoff.jpg')} />}
      </View>

      {/* {showLightBulb && <Image style={{aspectRatio:1}} source={require('./lighton.jpg')} />} */}

      <TouchableOpacity style={{width:'100%',height:60,justifyContent:'center',alignItems:'center',backgroundColor:'black',position:'absolute',bottom:0}} onPress={()=> {
        stopRec()
      }}>
        <Text style={{color:'white'}}>Stop Listeing</Text>
      </TouchableOpacity>
    </View>
  );
}
