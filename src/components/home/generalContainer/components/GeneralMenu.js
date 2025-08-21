import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated } from 'react-native';
import colors from '../../../../res/colors';
import BotonMenu from '../../header/components/BotonMenu';

const windowWidth = Dimensions.get('window').width;

class GeneralMenu extends Component {
  constructor(props) {
    super(props);

    const homeIndex = props.activeButtons.findIndex(b => b.categoria === 'home');
    this.homeIndex = homeIndex !== -1 ? homeIndex : 0;

    this.buttonWidth = (windowWidth - 20) / props.activeButtons.length;

    this.selectedAnim = new Animated.Value(this.homeIndex);
  }

  componentDidMount() {
    const homeButton = this.props.activeButtons[this.homeIndex];
    if (homeButton && this.props.onPressButton) {
      this.props.onPressButton(homeButton.idMenu);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedId !== this.props.selectedId) {
      const newIndex = this.props.activeButtons.findIndex(
        b => b.idMenu === this.props.selectedId
      );
      Animated.timing(this.selectedAnim, {
        toValue: newIndex,
        duration: 250,
        useNativeDriver: false
      }).start();
    }
  }

  renderButton = (buttonItem, index) => {
    const isSelected = this.props.selectedId === buttonItem.idMenu;

    return (
      <Pressable
        key={buttonItem.idMenu || Math.random()}
        style={[styles.iconContStyle, { width: this.buttonWidth }]}
        onPress={() => buttonItem.nombre !== 'vacio' && this.props.onPressButton(buttonItem.idMenu)}
      >
        {buttonItem.nombre !== 'vacio' && (
          <BotonMenu
            type={buttonItem.type}
            icon={buttonItem.icon}
            size={24}
            color={isSelected ? colors.black : colors.black}
          />
        )}
      </Pressable>
    );
  }

  render() {
    const translateX = this.selectedAnim.interpolate({
      inputRange: [0, this.props.activeButtons.length - 1],
      outputRange: [0, this.buttonWidth * (this.props.activeButtons.length - 1)]
    });

    return (
      <View style={styles.container}>
        <View style={styles.containerIcons}>
          <Animated.View
            style={[
              styles.backgroundSelected,
              { width: this.buttonWidth, transform: [{ translateX }] }
            ]}
          />
          {this.props.activeButtons.map(this.renderButton)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    width: windowWidth,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  containerIcons: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  iconContStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backgroundSelected: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 30,
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default GeneralMenu;
