import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import colors from '../../../res/colors';
import MenuHeader from './components/MenuHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Header extends Component {
  state = {
    showSearch: false,
    searchText: '',
    searchActive: false,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  onKeyboardHide = () => {
    if (!this.state.searchText) {
      this.setState({ showSearch: false });
    }
  };

  toggleSearch = () => {
    this.setState(
      prev => ({ showSearch: !prev.showSearch, searchText: '', searchActive: false }),
      () => {
        if (!this.state.showSearch && this.props.onSearch) {
          this.props.onSearch('');
        }
      }
    );
  };

  handleChangeText = text => {
    this.setState({ searchText: text }, () => {
      if (!this.state.searchActive && this.props.onSearch) {
        this.props.onSearch(text);
      }
    });
  };

  handleSubmit = () => {
    this.setState({ searchActive: true }, () => {
      if (this.props.onSearch) this.props.onSearch(this.state.searchText);
      Keyboard.dismiss();
    });
  };

  handleClear = () => {
    this.setState({ searchText: '', searchActive: false }, () => {
      if (this.props.onSearch) this.props.onSearch('');
      this.setState({ showSearch: false });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuHeader />
        <View style={styles.searchContainer}>
          {this.state.showSearch ? (
            <View style={styles.inputWrapper}>
              <TextInput
                autoFocus
                style={styles.searchInput}
                placeholder="BUSCAR"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={this.state.searchText}
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmit}
                selectionColor="white"
              />
              {this.state.searchText ? (
                <TouchableOpacity onPress={this.handleClear} style={styles.clearButton}>
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <TouchableOpacity onPress={this.toggleSearch} style={styles.iconButton}>
              <Icon name="magnify" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    zIndex: 1000,
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    width: 200,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  iconButton: {
    padding: 5,
  },
});

export default Header;
