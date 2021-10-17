import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getImageColors } from '../helpers/getColors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/core';

const screenWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
};

export const PokemonCard = ({ pokemon }: Props) => {
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (!isMounted.current) return;
        getCardColor();
        return () => {
            isMounted.current = false;
        }
    }, []);

    const getCardColor = async () => {
        const color = await getImageColors(pokemon.picture);
        if (color && isMounted) {
            setBgColor(color);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                ...styles.cardContainer,
                width: screenWidth * 0.42,
                backgroundColor: bgColor
            }}
            onPress={() => navigation.navigate('PokemonScreen', {
                simplePokemon: pokemon,
                color: bgColor
            })}
        >
            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>
            </View>
            <View style={styles.pokeballContainer}>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />
            </View>
            <FadeInImage
                uri={pokemon.picture}
                style={styles.pokemonImage}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 135,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 7,
        left: 10,
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        opacity: 0.3,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
    },
    pokeball: {
        width: 100,
        height: 100,
        right: -20,
        bottom: -20,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
});
