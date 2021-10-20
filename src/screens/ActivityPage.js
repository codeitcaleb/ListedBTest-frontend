import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, Pressable, Button } from 'react-native'
import Modal from "react-native-modal";

const ActivityPage = ({route, navigation}) => {
    // console.log(route.params)
    const {id} = route.params.id

    const [username, setUsername] = useState(route.params.username)
    const [message, setMessage] = useState(route.params.message)
    const [imageURL, setImageURL] = useState(route.params.image_url)
    const [modalVisible, setModalVisible] = useState(false)
    
    const toggleModal = () => {
        console.log(modalVisible)
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <Image source={{uri: imageURL}} style={{ width: 200, height: 200 }} />    
            <Text>{username} is {message}</Text>
            <View>
                <Button title="Edit" onPress={() => toggleModal()} />
            </View>
            

            <Modal
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {/* <View> */}
                    <TextInput 
                        onChangeText={setUsername}
                        // value={username}
                    />

                    <TextInput 
                        onChangeText={setMessage}
                        // value={message}
                    />

                    <TextInput 
                        onChangeText={setUsername}
                        // value={username}
                    />
                {/* </View> */}
            </Modal>
        </View>
    )
}

export default ActivityPage
