import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconZocial from 'react-native-vector-icons/Zocial';
import colors from '../../../../res/colors';
import { connect } from 'react-redux';

export const type = {
    Foundation: 'Foundation',
    AntDesign: 'AntDesign',
    Entypo: 'Entypo',
    EvilIconsation: 'EvilIconsation',
    Feather: 'Feather',
    FontAwesome: 'FontAwesome',
    FontAwesome5: 'FontAwesome5',
    FontAwesome5Pro: 'FontAwesome5Pro',
    Fontisto: 'Fontisto',
    Ionicons: 'Ionicons',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    MaterialIcons: 'MaterialIcons',
    Octicons: 'Octicons',
    SimpleLineIcons: 'SimpleLineIcons',
    Zocial: 'Zocial',
}

class BotonMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderIcon() {
        var iconSize = 28;
        var iconColor = colors.gray;
        let { icon, type, color, goTo, size } = this.props
        if (color) {
            iconColor = color;
        }
        if (size) {
            iconSize = size;
        }

        var stylesIcon = styles.soloIconMenu;
        if ( goTo != '' && goTo != undefined ) {
            stylesIcon = styles.iconMenu;
        }

        
        switch (type) {                                                     
            case 'Foundation':
                return (
                    <IconFoundation name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'AntDesign':
                return (
                    <IconAntDesign name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Entypo':
                return (
                    <IconEntypo name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'EvilIconsation':
                return (
                    <IconEvilIcons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Feather':
                return (
                    <IconFeather name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'FontAwesome':
                return (
                    <IconFontAwesome name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'FontAwesome5':
                return (
                    <IconFontAwesome5 name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'FontAwesome5Pro':
                return (
                    <IconFontAwesome5Pro name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Fontisto':
                return (
                    <IconFontisto name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Ionicons':
                return (
                    <IconIonicons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'MaterialCommunityIcons':
                return (
                    <IconMaterialCommunityIcons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'MaterialIcons':
                return (
                    <IconMaterialIcons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Octicons':
                return (
                    <IconOcticons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'SimpleLineIcons':
                return (
                    <IconSimpleLineIcons name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            case 'Zocial':
                return (
                    <IconZocial name={icon} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;

            default:
                return (
                    <IconZocial name={'home'} size={iconSize} color={iconColor} style={stylesIcon} />
                )
                break;
        }

    }

    render() {

        let { label, goTo } = this.props
        return (
            goTo != '' && goTo != undefined ?

                <Pressable style={styles.botonMenu} onPress={() => this.props.navigationRid.navigate(goTo)} >
                    {this.renderIcon()}
                    <Text style={styles.texMenu}> {label} </Text>
                </Pressable>

                :

                this.renderIcon()


        );
    }
}
const styles = StyleSheet.create({

    botonMenu: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        alignSelf: 'center',
        margin: 'auto'
    },
    texMenu: {
        textAlignVertical: 'center'
    },
    listaMenu: {
        width: '100%',
    },
    iconMenu: {
        paddingHorizontal: 20,
        height:'100%',
        textAlignVertical: 'center'
    },

    soloIconMenu: {
        height:'100%',
        textAlignVertical: 'center',       
    },
})

const mapStateToProps = (state) => {
    return {
        navigationRid: state.navigationRid
    }
}

export default connect(mapStateToProps)(BotonMenu);

