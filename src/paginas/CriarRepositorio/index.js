import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../servicos/api';

export default function Principal({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function createRepo() {
        api.post('/posts/1/repos', {
            name,
            description,
            postId: 1
        }).then(() => {
            Alert.alert('Repositório criado com sucesso!');
            setName('')
            setDescription('')
            navigation.goBack();
        }).catch(() => {
            Alert.alert('Erro ao criar o repositório!');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TextInput
                placeholder="Digite o usuário do github"
                value={name}
                autoCapitalize="none"
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite o usuário do github"
                value={description}
                autoCapitalize="none"
                onChangeText={setDescription}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={() => createRepo()}>
                <Text style={styles.buttonText}>
                    Criar Repositório
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
