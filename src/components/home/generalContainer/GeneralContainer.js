import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GeneralMenu from './components/GeneralMenu';
import { connect } from 'react-redux';
import colors from '../../../res/colors';

const buttons = [
  { nombre: "Acción", icon: 'pistol', idMenu: 3, type: 'MaterialCommunityIcons', categoria: 'accion' },
  { nombre: "Aventura", icon: 'run-fast', idMenu: 4, type: 'MaterialCommunityIcons', categoria: 'aventura' },
  { nombre: "Ciencia Ficción", icon: 'rocket', idMenu: 5, type: 'MaterialCommunityIcons', categoria: 'ciencia ficcion' },
  { nombre: "Comedia", icon: 'theater-masks', idMenu: 6, type: 'FontAwesome5', categoria: 'comedia' },
  { nombre: "Home", icon: 'home', idMenu: 7, type: 'AntDesign', categoria: 'home' },
  { nombre: "Drama", icon: 'drama-masks', idMenu: 8, type: 'MaterialCommunityIcons', categoria: 'drama' },
  { nombre: "Fantasía", icon: 'unicorn', idMenu: 9, type: 'MaterialCommunityIcons', categoria: 'fantasia' },
  { nombre: "Romance", icon: 'heart', idMenu: 10, type: 'MaterialCommunityIcons', categoria: 'romance' },
  { nombre: "Suspenso", icon: 'alert-circle', idMenu: 11, type: 'MaterialCommunityIcons', categoria: 'suspenso' },
  { nombre: "Terror", icon: 'ghost', idMenu: 12, type: 'SimpleLineIcons', categoria: 'terror' },

];

class GeneralContainer extends Component {
  constructor(props) {
    super(props);
    const homeButton = buttons.find(b => b.categoria === 'home');
    this.state = {
      idMenu: homeButton ? homeButton.idMenu : 0,
      activeButtons: buttons
    };
  }

  componentDidMount() {
    const homeButton = this.state.activeButtons.find(b => b.categoria === 'home');
    if (homeButton) {
      this.onSelectTab(homeButton.idMenu);
    }
  }

  onSelectTab = (idMenu) => {
    this.setState({ idMenu });
    const btn = this.state.activeButtons.find(b => b.idMenu === idMenu);
    if (!btn) return;

    const tab = btn.categoria === 'home' ? 'home' : 'peliculas';
    const categoriaNormalized = btn.categoria.toLowerCase();

    if (this.props.onSelectTab) {
      this.props.onSelectTab(tab, categoriaNormalized);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GeneralMenu
          activeButtons={this.state.activeButtons}
          selectedId={this.state.idMenu}
          onPressButton={this.onSelectTab}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: colors.white },
});

export default connect()(GeneralContainer);
