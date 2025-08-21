import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Animated, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../res/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const offSetHorizontal = windowWidth * 0.8;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false,
      menuAbierto: new Animated.Value(-1 * offSetHorizontal),
      fondoOpacity: new Animated.Value(0),
      verFondo: 'none',
      nombreUsuario: ''
    };
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonEvent);
    this.cargarNombreUsuario();
  }

  componentWillUnmount() {
    this.BackHandler?.remove();
  }

  onBackButtonEvent = () => {
    BackHandler.exitApp();
    return true;
  }

  cargarNombreUsuario = async () => {
    try {
      const nombre = await AsyncStorage.getItem('usuarioLogueado');
      if (nombre) this.setState({ nombreUsuario: nombre });
    } catch (err) {
      console.log('Error cargando usuario logueado:', err);
    }
  }

  abrirMenu = () => {
    this.setState({ abierto: true, verFondo: 'flex' });
    Animated.timing(this.state.menuAbierto, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    Animated.timing(this.state.fondoOpacity, { toValue: 1, duration: 500, useNativeDriver: false }).start();
  }

  cerrarMenu = () => {
    this.setState({ abierto: false });
    Animated.timing(this.state.menuAbierto, { toValue: -1 * offSetHorizontal, duration: 300, useNativeDriver: false }).start();
    Animated.timing(this.state.fondoOpacity, { toValue: 0, duration: 500, useNativeDriver: false }).start();
    setTimeout(() => this.setState({ verFondo: 'none' }), 500);
  }

  cerrarSesion = async () => {
    await AsyncStorage.removeItem('usuarioLogueado'); 
    this.props.navigation.navigate('Splash');
    this.cerrarMenu();
  }

  render() {
    const { menuAbierto, fondoOpacity, verFondo, nombreUsuario } = this.state;

    return [
      <Pressable key='menupress' style={styles.menu} onPress={this.abrirMenu}>
        <Icon name="menu" size={30} color={colors.white} />
      </Pressable>,

      <Animated.View key='menucontainer' style={[styles.menuContainer, { left: menuAbierto }]}>
        <Pressable style={styles.menuClose} onPress={this.cerrarMenu}>
          <Icon name="close" size={30} color={colors.white} />
        </Pressable>

        <View style={styles.header}>
          <Pressable>
            <Icon name="account-circle" size={60} color={colors.white} />
          </Pressable>
          <Text style={styles.bienvenida}>¡HOLA BIENVENIDO!</Text>
          <Text style={styles.nombreUsuario}>{nombreUsuario || 'Usuario'}</Text>
        </View>

        <View style={styles.listaMenu}>
          <Pressable
            onPress={this.cerrarSesion}
            style={({ pressed }) => [
              styles.botonCerrar,
              { opacity: pressed ? 0.6 : 1 }
            ]}
          >
            <Icon name="logout" size={28} color={colors.white} />
            <Text style={styles.botonCerrarText}>CERRAR SESIÓN</Text>
          </Pressable>
        </View>
      </Animated.View>,

      <Animated.View key='fondoMenu' style={[styles.fondoMenu, { display: verFondo, opacity: fondoOpacity }]}>
        <Pressable style={[styles.fondoMenu, { backgroundColor: 'transparent' }]} onPress={this.cerrarMenu} />
      </Animated.View>
    ];
  }
}

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-start',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuContainer: {
    width: offSetHorizontal,
    height: windowHeight,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1,
    display: 'flex'
  },
  menuClose: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: 25
  },
  bienvenida: {
    fontSize: 18,
    color: colors.white,
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center'
  },
  nombreUsuario: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    textAlign: 'center'
  },
  fondoMenu: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.85)',
    top: 0,
    left: 0
  },
  listaMenu: {
    paddingBottom: 200,
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray2
  },
  botonCerrar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    left: 40
  },
  botonCerrarText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10
  }
});

export default function MenuHeaderWrapper(props) {
  const navigation = useNavigation();
  return <MenuHeader {...props} navigation={navigation} />;
}
