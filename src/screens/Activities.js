import React, { Component, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, Pressable, Button, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


import {URL} from '@env'

const Activities = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [imageURL, setImageURL] = useState(null)
    const [activities, setActivities] = useState([])

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      useEffect(() => {
        fetchData()
      }, [])

      const fetchData =  () => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setActivities(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error))
      }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImageURL(result.uri);
        }
      };

    const handleFormSubmit = () => {
      const data = { username, message, imageURL }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }

      fetch(URL, requestOptions)
      .then(response => response.json())
      .then(respData => setActivities(respData))
    }

    const handleActivityClick = (item) => {
      navigation.navigate("ActivityPage", {
          id: item.id,
          username: item.username,
          message: item.message,
          image_url: item.image_url
      })
    }

    const renderItem = ({ item }) => {
        return  (
            <View style={styles.cardContainer}>
                <Pressable onPress={() => handleActivityClick(item)}>
                    <Image source={{uri: item.image_url}} style={{ width: 200, height: 200 }} />    
                    <Text>{item.username} is {item.message}</Text>
                </Pressable>
            </View>
        )
      };

    return (
        <View style={styles.container}>
            {/* <Text>Activities</Text> */}

            {/* <View style={styles.container}> */}
                {/* <Text>Add Activity</Text> */}

                <TextInput
                          style={styles.formInputs}
                          onChange={(e) => setUsername(e.target.value)} //For Web
                          onChangeText={(e) => setUsername(e)} //For Native/Mobile Devices
                          placeholder={"Username"}
                          placeholderTextColor="#fff"
                />

                <TextInput
                          style={styles.formInputs}
                          onChange={(e) => setUsername(e.target.value)} //For Web
                          onChangeText={(e) => setUsername(e)} //For Native/Mobile Devices
                          placeholder={"Message"}
                          placeholderTextColor="#fff"
                />

                <Button 
                    title="Choose an image" 
                    onPress={pickImage} 
                />
                {imageURL && <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} />}

                <View style={styles.submitButtonContainer}>
                    <Button 
                        title="Submit" 
                        onPress={handleFormSubmit} 
                    /> 
                </View>
                
              {activities && (
                    <FlatList 
                        data={activities}
                        renderItem={renderItem}
                    />
                )
              }
                
            </View>
           
        // </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    cardContainer: {
        margin: "10pt"
    },
    formInputs: {
        borderColor: 'white',
        padding: '10px',
        margin: "10pt",
        color: 'white'
    },
    submitButtonContainer: {
        margin: "15px"
    }
});

//make this component available to the app
export default Activities;
