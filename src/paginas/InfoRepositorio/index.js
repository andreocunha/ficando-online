import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../servicos/api';

export default function InfoRepositorio({ route, navigation }) {
    const [name, setName] = useState(route.params.name);
    const [data, setData] = useState(route.params.data);

    function salvarRepositorio() {
        api.put(`/repos/${route.params.id}`, {
            id: route.params.id,
            name,
            data,
            postId: route.params.postId
        }).then(() => {
            Alert.alert('Repositório atualizado com sucesso!');
            setName('')
            setData('')
            navigation.goBack();
        }).catch((e) => {
            Alert.alert('Erro ao atualizar o repositório!');
            console.log(e);
        });
    }

    function deletarRepositorio() {
        api.delete(`/repos/${route.params.id}`).then(() => {
            Alert.alert('Repositório deletado com sucesso!');
            navigation.goBack();
        }).catch((e) => {
            Alert.alert('Erro ao atualizar o repositório!');
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
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => salvarRepositorio()}
            >
                <Text style={styles.buttonText}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={() => deletarRepositorio()}
            >
                <Text style={styles.buttonText}>
                    Deletar
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
        marginTop: 50,
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
