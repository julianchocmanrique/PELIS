import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BotonMenu from '../home/header/components/BotonMenu';
import colors from '../../res/colors';

class RidButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    hexToRgb(hex) {
        const hexCode = hex.charAt(0) === '#' 
                            ? hex.substr(1, 6)
                            : hex;
    
        const hexR = parseInt(hexCode.substr(0, 2), 16);
        const hexG = parseInt(hexCode.substr(2, 2), 16);
        const hexB = parseInt(hexCode.substr(4, 2), 16);
        const contrastRatio = (hexR + hexG + hexB) / (255 * 3);
    
        return contrastRatio >= 0.5
            ? 'black'
            : 'white';
    }

    render() {

        let { text, Icono, typoDeicono, colorP, onPress } = this.props

        let width = 'auto'

        if (text) {
            width = '45%'
        }

        let color = colors.primary

        if (colorP) {
            color = colorP
        }
        return (
            <Pressable style={[styles.boton, { width: width, backgroundColor: color }]} onPress={onPress}>
                {Icono ?
                    <View style={styles.icono}>
                        <BotonMenu icon={Icono} type={typoDeicono} size={20} color={this.hexToRgb(color)} />
                    </View>
                    :
                    null
                }

                {text ?
                    <Text style={[styles.texto, {color: this.hexToRgb(color)}]}> {text} </Text>
                    :
                    null}
            </Pressable>
        );
    }
}


const styles = StyleSheet.create({

    boton: {
        borderRadius: 50,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        elevation: 2,
        display: 'flex',
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40,
        alignItems: 'center',
        minWidth: 40,
        marginTop: 10,
        marginHorizontal: 5

    },

    texto: {
        fontSize: 18,
        textAlignVertical: 'center',
        justifyContent: 'center',

    },

    

})

export default RidButton;
