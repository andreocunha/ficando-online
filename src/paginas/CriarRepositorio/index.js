import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../servicos/api';

export default function CriarRepositorio({ route, navigation }) {
    const [name, setName] = useState('');
    const [data, setData] = useState('');

    function createRepo() {
        api.post('/repos', {
            name,
            data,
            postId: route.params.id
        }).then(() => {
            Alert.alert('Repositório criado com sucesso!');
            setName('')
            setData('')
            navigation.goBack();
        }).catch(() => {
            Alert.alert('Erro ao criar o repositório!');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                placeholder="Nome do repositório"
                value={name}
                autoCapitalize="none"
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Data de criação"
                value={data}
                autoCapitalize="none"
                onChangeText={setData}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={() => createRepo()}>
                <Text style={styles.buttonText}>
                    Criar
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
        justifyContent: 'center',
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
        marginTop: 20,
        borderRadius: 8,
        height: 44,
        width: '90%',
    }
});
