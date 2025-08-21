import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../res/colors';
import BotonMenu  from '../home/header/components/BotonMenu';


class GoBackBar extends Component {
    
    
    render() {
        let { name, icon, type, color } = this.props
        
        return (
            <View style={styles.back}>
                <Pressable style={styles.iconBack} onPress={() => this.props.navigation.goBack()}>
                    <Icon size={30}  name='arrow-back' color={colors.white}></Icon>
                </Pressable>
                
                <BotonMenu style={styles.iconBack} type={type} icon={icon} color={color}/>
                <Text style={styles.textBack}> {name} </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    back: {
        height: 50,
        width: '100%',
        display: 'flex',
        backgroundColor: colors.primary,
        flexDirection: 'row',
        marginBottom:20,
    },
    iconBack: {
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    textBack: {
        fontSize: 20,
        justifyContent: 'center',
        textAlignVertical: 'center',
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8
    }
})

export default GoBackBar;
