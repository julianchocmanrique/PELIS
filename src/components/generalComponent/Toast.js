import { Toast } from 'toastify-react-native';
import React from 'react';
/* import BounceLoader from "react-spinners/BounceLoader"; */
import BotonMenu, { type } from '../home/header/components/BotonMenu';
import colors from '../../res/colors';
import { View, Text } from 'react-native';





let cargando = null;
export const tiposAlertas = {info: 1, success: 2, warn: 3, error: 4, autoCloseCustom: 5, cargando: 6, cargadoSuccess: 7, cargadoWarn: 8, cargadoError: 9, cerrarTodas: 10};

export const nuevoMensaje = (icono,mensaje,auto) =>{

    const override = `
  display: flex;
  margin-right: 5px;
  border-color: red;
  flex-direction: row;
`;


    switch (icono) {
        case 1:
            Toast.info(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>
                {/* <InfoOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>,{
                    autoClose: auto
                }
            );
            break;

        case 2:
            Toast.success(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>
                {/* <CheckOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>, auto
            );
            break;
            
        case 3:
            Toast.warn(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                {/* <ReportProblemOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>,{
                    autoClose: auto
                }
            );
            break;

        case 4:
            Toast.error(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                {/* <HighlightOffOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>,{
                    autoClose: auto
                }
            );
            break;

        case 5:
            Toast.success(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                {/* <CheckOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>,auto
            );
            break;

        case 6:
            cargando = Toast.warn(
                <View>
                {/* <BounceLoader 
                    css={override}
                    size={20}
                    color={"#fff"}/> */}

                <Text>{mensaje}</Text>
                </View>, 0
                
            );
            break;

        case 7:
            Toast.update(cargando, {
                render: 
                    <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                        {/* <CheckOutlinedIcon style={{marginRight: '5px'}}/> */}
                        <Text>{mensaje}</Text>
                    </View>,
                type: Toast.TYPE.SUCCESS,
                autoClose: auto
              });
            break;

        case 8:
            Toast.update(cargando, {
                render: 
                    <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                        {/* <ReportProblemOutlinedIcon style={{marginRight: '5px'}}/> */}
                        <Text>{mensaje}</Text>
                    </View>,
                type: Toast.TYPE.WARNING,
                autoClose: auto
              });
            break;

        case 9:
            Toast.update(cargando, {
                render: 
                    <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                        {/* <HighlightOffOutlinedIcon style={{marginRight: '5px'}}/> */}
                        <Text>{mensaje}</Text>
                    </View>,
                type: Toast.TYPE.ERROR,
                autoClose: auto
              });
            break;

        case 10:
            Toast.success(
                <View>
                    <BotonMenu styles={{paddingHorizontal: 3}} type={type.Feather} icon='check-circle' color={colors.success}/>

                {/* <CloseOutlinedIcon style={{marginRight: '5px'}}/> */}
                <Text>{mensaje}</Text>
                </View>,{
                    onClose: props => Toast.dismiss(),
                    autoClose: auto

                }
            );
            break;

        
    
        default:
            break;
    }
    
}
