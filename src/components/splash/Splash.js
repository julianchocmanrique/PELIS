import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import colors from '../../res/colors';
import Login from '../generalContent/usuarios/Login';
import { validateLogin } from '../../database/db';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1),
            top: new Animated.Value(150),
            finishAnimated: false,
            opacity: new Animated.Value(0),
            loginFailed: false,
        };
    }

    componentDidMount() {
        this.iniciarAnimacion();
    }

    pulse(num) {
        return new Promise((resolve) => {
            if (num > 0) {
                Animated.timing(this.state.scale, { toValue: 1.6, duration: 500, useNativeDriver: false }).start(() => {
                    Animated.timing(this.state.scale, { toValue: 1, duration: 500, useNativeDriver: false }).start();
                });
                setTimeout(() => {
                    this.pulse(num - 1).then(resolve);
                }, 1000);
            } else resolve();
        });
    }

    async iniciarAnimacion() {
        await this.pulse(1);
        Animated.timing(this.state.scale, { toValue: 1.3, duration: 500, useNativeDriver: false }).start();
        Animated.timing(this.state.top, { toValue: 0, duration: 500, useNativeDriver: false }).start(async () => {
            this.setState({ finishAnimated: true, top: new Animated.Value(197) });
            Animated.timing(this.state.opacity, { toValue: 1, duration: 1000, useNativeDriver: false }).start();

            const creds = this.props.route?.params?.loginCreds;
            if (creds) {
                const valido = await validateLogin(creds.usuario, creds.password);
                if (valido) {
                    setTimeout(() => this.props.navigation.replace('Home'), 500);
                } else {
                    this.setState({ loginFailed: true });
                }
            }
        });
    }

    render() {
        const displayForm = this.state.finishAnimated ? 'flex' : 'none';
        const styleImage = this.state.finishAnimated
            ? [styles.LogoNoAni]
            : [styles.LogoAni, { top: this.state.top, transform: [{ scale: this.state.scale }] }];
        const stylesContainerImage = this.state.finishAnimated ? styles.containerImageNoAni : styles.containerImageAni;

        return (
            <View style={styles.container}>
                <View style={stylesContainerImage}>
                    <Animated.Image
                        style={styleImage}
                        resizeMode='contain'
                        source={require('../../assets/LOGO.png')}
                    />
                </View>

                <Animated.View style={{ display: displayForm, opacity: this.state.opacity, pointerEvents: this.state.finishAnimated ? 'auto' : 'none' }}>
                    <Login navigation={this.props.navigation} showLogin={this.state.loginFailed} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.gray9 },
    LogoAni: { height: '40%', position: 'relative' },
    LogoNoAni: { height: '40%', bottom: '-100%', position: 'relative', transform: [{ scale: 1.3 }] },
    containerImageNoAni: { height: '50%' },
    containerImageAni: { height: '50%' },
});

export default Splash;
