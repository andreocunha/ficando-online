import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import api from '../../servicos/api';

export default function Repositorios({ route }) {
    const [repo, setRepo] = useState([]);

    useEffect(() => {
        api.get(`/users/${route.params.user.login}/repos?=100`).then(response => {
            setRepo(response.data);
        });
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.lista}>
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
});
