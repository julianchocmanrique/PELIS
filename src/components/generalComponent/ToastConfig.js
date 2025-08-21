import React from 'react';
import { BaseToast } from 'react-native-toast-message';
import { View } from 'react-native';
import colors from '../../res/colors';
import BotonMenu, { type } from '../home/header/components/BotonMenu';

var fontSizeText1 = 20;
var fontSizeText2 = 17;
export const toastConfig = {

  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.success,
      height: 'auto'
     }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: colors.successLight}}
      text1Style={{
        fontSize: fontSizeText1,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: fontSizeText2,
      }}
      text2Props={{numberOfLines: 0}}
      renderLeadingIcon={() => <View backgroundColor={colors.successLight} ><BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/></View>}
      />
      
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.error,
      height: 'auto'
     }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: colors.errorLight}}
      text1Style={{
        fontSize: fontSizeText1,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: fontSizeText2,
      }}
      text2Props={{numberOfLines: 0}}
      renderLeadingIcon={() => <View backgroundColor={colors.errorLight} ><BotonMenu styles={{paddingHorizontal: 3}} type={type.Fontisto} icon='close' color={colors.error}/></View>}
      />
  ),
  info: (props) => (
    <BaseToast
    {...props}
    style={{ borderLeftColor: colors.secondary,
    height: 'auto'
   }}
    contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: colors.infoLight}}
    text1Style={{
      fontSize: fontSizeText1,
      fontWeight: '400'
    }}
    text2Style={{
      fontSize: fontSizeText2,
    }}
    text2Props={{numberOfLines: 0}}
    renderLeadingIcon={() => <View backgroundColor={colors.infoLight} ><BotonMenu styles={{paddingHorizontal: 3}} type={type.Octicons} icon='info' color={colors.secondary}/></View>}
    />
  ),
  warn: (props) => (
    <BaseToast
    {...props}
    style={{ borderLeftColor: colors.warn,
    height: 'auto'
   }}
    contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: colors.warnLight}}
    text1Style={{
      fontSize: fontSizeText1,
      fontWeight: '400'
    }}
    text2Style={{
      fontSize: fontSizeText2,
    }}
    text2Props={{numberOfLines: 0}}
    renderLeadingIcon={() => <View backgroundColor={colors.warnLight} ><BotonMenu styles={{paddingHorizontal: 3}} type={type.AntDesign} icon='warning' color={colors.warn}/></View>}
    />
  ),
  help: (props) => (
    <BaseToast
    {...props}
    style={{ borderLeftColor: colors.help,
    height: 'auto'
   }}
    contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: colors.helpLight}}
    text1Style={{
      fontSize: fontSizeText1,
      fontWeight: '400'
    }}
    text2Style={{
      fontSize: fontSizeText2,
    }}
    text2Props={{numberOfLines: 0}}
    renderLeadingIcon={() => <View backgroundColor={colors.helpLight} paddingLeft={8}><BotonMenu styles={{paddingHorizontal: 8}} type={type.MaterialCommunityIcons} icon='help' color={colors.help}/></View>}
    />
  ),
};


export const typeToast ={success: 'success', error: 'error', info: 'info', warn: 'warn', help: 'help'}


