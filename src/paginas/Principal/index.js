import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../servicos/api';

export default function Principal({ navigation }) {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});

    function searchUserGithub() {

        //using fetch to get github user info
        // fetch(`https://api.github.com/users/${username}`)
        // .then(response => response.json())
        // .then(response => {
        //     setUser(response);
        //     Alert.alert(`Bem vindo ${response.login}`);
        // })
        // .catch(error => {
        //     Alert.alert(`Usuário não encontrado`);
        // })


        api.get(`/users/${username}`).then(response => {
            setUser(response.data);
            setUsername('');
        }).catch(error => {
            Alert.alert('Atenção:', 'Usuário não encontrado');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                placeholder="Digite o usuário do github"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={() => searchUserGithub()}>
                <Text style={styles.buttonText}>
                    Pesquisar
                </Text>
            </TouchableOpacity>

            {
                !!user?.login && (
                    <>
                        <Text>{user?.name}</Text>
                        <Image source={{ uri: user?.avatar_url }} style={{ width: 200, height: 200 }} />
                        <View>
                            <Text>Followers: {user?.followers}</Text>
                            <Text>Following: {user?.following}</Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigation.navigate('Repositorios', { user })}>
                            <Text style={styles.buttonText}>
                                Ver os {user?.public_repos} repositórios
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#7159c1',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    input: {
        borderWidth: 2,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginTop: 20,
        borderRadius: 4,
        height: 44,
        width: '80%',
    }
});
