import React, { Component } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from '../../generalComponent/Button';
import colors from '../../../res/colors';
import { validateLogin } from '../../../database/db';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securePass: true,
      usuario: '',
      password: '',
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.showLogin) this.setState({ usuario: '', password: '' });
  }

  onChangeText = (field, value) => {
    this.setState({ [field]: value });
  }

  validarLogin = async () => {
    const { usuario, password } = this.state;
    if (!usuario || !password) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    this.setState({ loading: true });

    try {
      const loginValido = await validateLogin(usuario, password);

      if (loginValido) {
        
        this.props.navigation.replace('Home');
      } else {
        Alert.alert('Login inválido', 'Usuario o contraseña incorrectos');
        this.setState({ password: '' });
      }
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error, intente nuevamente');
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { usuario, password, securePass, loading } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.block}>
            <Text style={styles.title}></Text>

            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                label="Usuario"
                value={usuario}
                onChangeText={(text) => this.onChangeText('usuario', text)}
              />
              <TextInput
                style={styles.input}
                label="Contraseña"
                secureTextEntry={securePass}
                value={password}
                onChangeText={(text) => this.onChangeText('password', text)}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => this.setState({ securePass: !securePass })}
                  />
                }
              />
            </View>

            <Button
              text={loading ? "Validando..." : "Iniciar sesión"}
              disabled={loading}
              onPress={this.validarLogin}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContainer: { flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 80, paddingHorizontal: 20 },
  block: { width: '100%', maxWidth: 400, alignItems: 'center' },
  title: { fontSize: 55, fontWeight: 'bold', color: colors.primary, marginBottom: 40, textAlign: 'center' },
  inputsContainer: { width: 350, marginBottom: 30 },
  input: { marginBottom: 20, backgroundColor: 'white', width: '100%' },
  button: { width: 400, alignSelf: 'center' },
});

export default Login;
