import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ActivityList = (list) => {
    const [activities, setActivities] = useState([])

    return (
        <View style={styles.container}>
            <FlatList 
                data={list}
                renderItem={({item}) => <Activity username={item.username} message={item.message} imageURL={item.imageURL} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ActivityList;
