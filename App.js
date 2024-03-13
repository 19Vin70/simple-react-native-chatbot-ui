import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserInput = ({ onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() !== '') {
      onSend(inputText);
      setInputText('');
    }
  };

  return (
    <View style={{ borderWidth: 2, borderColor: '#777', borderRadius: 10, margin: 10, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TextInput placeholder='Ask Anything...' style={{ flex: 1 }} value={inputText} onChangeText={setInputText} />
      <TouchableOpacity onPress={handleSend}>
        <Ionicons name='send' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const AIResponse = ({ text }) => {
  return (
    <View>
      <Text style={{ padding: 8, backgroundColor: '#0000ff', color: '#fff', borderRadius: 8, width: '100%' }}>{text}</Text>
    </View>
  );
};

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const response = 'Dadah: ' + text;
    setMessages([...messages, { type: 'user', text }, { type: 'AI', text: response }]);
  };

  return (
    <SafeAreaView style={{ flexDirection: 'column', justifyContent: 'space-between', height: '93%', marginTop: 40 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, position: 'relative', width: '100%', backgroundColor: '#f2f2f2' }}>
        <Image source={require('./assets/logo.png')} style={{ width: 35, height: 35 }} />
        <Text style={{ position: 'absolute', textAlign: 'center', marginLeft: 145, fontSize: 23, fontWeight: 'bold', letterSpacing: 1 }}>Dadah</Text>
      </View>

      <ScrollView>
        <View style={{ flexDirection: 'column', gap: 10, padding: 10, paddingTop: 20 }}>
          {messages.map((message, index) => (
            <View key={index}>
              {message.type === 'user' && <Text style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8, justifyContent: 'flex-end', width: 'fit-content' }}>{message.text}</Text>}
              {message.type === 'AI' && <AIResponse text={message.text} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <UserInput onSend={handleSend} />
    </SafeAreaView>
  );
}


