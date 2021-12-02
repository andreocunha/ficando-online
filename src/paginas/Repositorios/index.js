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
            <View style={styles.lista}>
                <TouchableOpacity style={styles.newRepo} onPress={() => navigation.navigate('CriarRepositorio')}>
                    <Text style={styles.newRepoText}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                <FlatList
                    data={repo}
                    // ListHeaderComponent={() => 
                    //     <Text style={styles.titulo}>Repositorios</Text>
                    // }
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.repositorio}
                        >
                            <Text style={styles.repositorioNome}>{item.name}</Text>
                            <Text style={styles.repositorioDescricao}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
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
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    lista: {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
    },
    repositorio: {
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
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
    repositorioDescricao: {
        fontSize: 14,
        color: '#999',
    },
    newRepo: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newRepoText: {
        fontSize: 16,
        color: '#999',
    },
});
