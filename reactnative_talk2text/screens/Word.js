import React, { useState, useEffect, useRef } from 'react'; // เพิ่ม import useRef
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Voice from '@react-native-voice/voice';

const words = ['sorry', 'lemon','apple','hello'];

export const Word = (props) => {
    const navigation = props.nav
    const route = props.route

    const backhome = () => {
        navigation.push('Home')
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [results, setResults] = useState([]);
    const [correctlySpoken, setCorrectlySpoken] = useState(null);
    
    // ใช้ ref ในการเก็บค่า randomWord
    const randomWordRef = useRef(null);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const getRandomWord = async () => {
        setCorrectlySpoken(null);
        const randomIndex = Math.floor(Math.random() * words.length);
        const newRandomWord = words[randomIndex];

        // อัพเดตค่า randomWord ผ่าน ref
        randomWordRef.current = newRandomWord;

        setIsModalVisible(true);
        startRec(newRandomWord);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const startRec = async (word) => {
        try {
            await Voice.start('en-US');
            setResults([]);
        } catch (err) {
            console.log('startRec', err);
        }
    };

    const onSpeechStart = (e) => {
        console.log('start', e);
    };

    const onSpeechEnd = (e) => {
        console.log('stop', e);
        setTimeout(()=> {
            setIsModalVisible(false)
        },1500)
    };

    const onSpeechResults = (e) => {
        console.log('User Speak (raw):', e);
    
        const randomWord = randomWordRef.current;
        console.log('randomWord:', randomWord);
    
        if (randomWord) {
            const spokenWords = e.value.map(word => word.toLowerCase());
            let correctlySpoken = false;
    
            for (const spokenWord of spokenWords) {
                if (spokenWord === randomWord) {
                    correctlySpoken = true;
                    break; // พบคำที่ตรงกับ randomWord แล้วออกจากลูป
                }
            }
    
            setCorrectlySpoken(correctlySpoken);
        } else {
            setCorrectlySpoken(false); // ถ้า randomWord เป็น null หรือว่าง
        }
    };
    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'pink' }}>
                <TouchableOpacity style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                    onPress={getRandomWord}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Random Word</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'blue',width:'100%',height:'20%',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                    onPress={backhome}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Home</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{randomWordRef.current}</Text>
                        {correctlySpoken !== null && (
                            <Text style={{ color: correctlySpoken ? 'green' : 'red', marginTop: 10, textAlign: 'center' }}>
                                {correctlySpoken ? 'พูดถูก!' : 'พูดผิด'}
                            </Text>
                        )}
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={closeModal}>
                            <Text style={{ color: 'blue', fontSize: 18, textAlign: 'center' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
