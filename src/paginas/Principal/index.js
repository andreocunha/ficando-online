import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../servicos/api';

export default function Principal({ navigation }) {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});

    function searchUserGithub() {
        api.get(`/users?login=${username}`).then(response => {
            setUser(response.data[0]);
            setUsername('');
        }).catch(error => {
            Alert.alert('Atenção:', 'Usuário não encontrado');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {
                !!user?.login && (
                    <>
                        <View style={styles.fundo} />
                        <View style={styles.imagemArea}>
                            <Image source={{ uri: user?.avatar_url }} style={styles.imagem} />
                        </View>
                        <Text style={styles.textoNome}>{user?.name}</Text>
                        <Text style={styles.textoEmail}>{user?.email}</Text>
                        <View style={styles.seguidoresArea}>
                            <View style={styles.seguidores}>
                                <Text style={styles.seguidoresNumero}>{user?.followers}</Text>   
                                <Text style={styles.seguidoresTexto}>Seguidores</Text>   
                            </View>
                            <View style={styles.seguidores}>
                                <Text style={styles.seguidoresNumero}>{user?.following}</Text>   
                                <Text style={styles.seguidoresTexto}>Seguindo</Text>   
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Repositorios', { id: user.id })}>
                            <Text style={styles.repositorios}>
                                Ver os repositórios
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }

            <TextInput
                placeholder="Busque por um usuário"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={() => searchUserGithub()}>
                <Text style={styles.buttonText}>
                    Buscar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#8A07DA',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '90%',
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
        marginTop: 40,
        borderRadius: 8,
        height: 44,
        width: '90%',
    },
    imagemArea:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: -75,
        backgroundColor: '#FFF',
    },
    imagem: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    fundo: {
        backgroundColor: '#C4C4C4',
        width: '100%',
        height: 156,
    }, 
    textoNome: {
        fontSize: 21,
        fontWeight: '600',
        color: '#45565F',
        padding: 15
    },
    textoEmail: {
        fontSize: 17,
        color: '#717E84',
        marginTop: 5,
    },
    seguidoresArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }, 
    seguidores: {
        margin: 20,
        alignItems: 'center',
    },
    seguidoresNumero: {
        color: '#8A07DA',
        fontSize: 15,
    },
    seguidoresTexto: {
        color: '#95A8B2',
        fontSize: 13,
        marginTop: 5,
    },
    repositorios:{
        color: '#8A07DA',
        fontSize: 15,
        fontWeight: '400',
    }
});
