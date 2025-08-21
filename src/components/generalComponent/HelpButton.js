import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HelpTexts } from '../../res/HelpTexts';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { typeToast } from '../generalComponent/ToastConfig';
import { stylesForm } from '../../res/EstilosFormularios';
import { TextInput } from 'react-native-paper';

const HelpButton = (Title, Text, visibilityTime) => {
    

        return (
                <TextInput.Icon icon="help" style={stylesForm.iconSmall} onPress={() => Toast.show({
                    type: typeToast.help,
                    text1: Title,
                    text2: Text,
                    visibilityTime: visibilityTime
                })} />
        );
}

export default HelpButton;











