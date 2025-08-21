import React, { Component } from 'react';
import { View, Text , StyleSheet } from 'react-native';
import colors from '../../../../res/colors';
import GoBackBar from '../../../generalComponent/GoBackBar';
import { type } from '../../../home/header/components/BotonMenu';

class CerrarSesion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <GoBackBar name='Dependencias' icon= 'puzzle' type= {type.SimpleLineIcons} color={colors.white} navigation={this.props.navigation} />
        <Text style={styles.text}> Dependencias </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
  },
  text: {
    fontSize: 50,
    alignSelf: 'center',
  }
})
export default CerrarSesion;
