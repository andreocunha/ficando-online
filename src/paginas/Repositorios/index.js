import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../../servicos/api';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        api.get(`/posts/${route.params.id}/repos`).then(response => {
            setRepo(response.data);
        });
    },[isFocused]);

    return (
        <View style={styles.container}>
                <Text style={styles.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={styles.botao} 
                    onPress={() => navigation.navigate('CriarRepositorio', { id: route.params.id })}
                >
                    <Text style={styles.botaoTexto}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                <FlatList
                    data={repo}
                    style={{ width: '100%' }}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio', { id: item.id, name: item.name, data: item.data, postId: item.postId })}
                        >
                            <Text style={styles.repositorioNome}>{item.name}</Text>
                            <Text style={styles.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    repositoriosTexto: {
        fontSize: 21,
        fontWeight: '600',
        color: '#45565F',
        marginTop: 20,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    repositorio: {
        width: '100%',
        height: 80,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    repositorioNome: {
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
    },
    repositorioData: {
        fontSize: 14,
        color: '#999',
    },
    botao: {
        backgroundColor: '#8A07DA',
        marginTop: 20,
        marginBottom: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '90%',
    },
    botaoTexto: {
        fontSize: 16,
        color: '#FFF',
    },
});
