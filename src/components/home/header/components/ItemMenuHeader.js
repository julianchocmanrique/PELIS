import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { validaPermisosInterface } from '../../../../res/validatorsForms';
import BotonMenu, { type } from './BotonMenu';
import { connect } from 'react-redux';


class ItemMenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        permiso: false
    };
  }

  async componentDidMount(){
    this.setState({
        permiso: await validaPermisosInterface(this.props.idInterface, this.props.usuario.roles)
    })
  }

  renderItem(){
    let { type, icon , label , goTo } = this.props

    return(
        <BotonMenu  type={type} icon={icon} label={label} goTo={goTo} ></BotonMenu>
        )
        
    }
    
    render() {
        return (
      this.state.permiso ?
      this.renderItem()
      :
      null
    );
  }
}


const mapStateToProps = (state) => {
    return {
        usuario: state.usuario
    }
}
export default connect(mapStateToProps)(ItemMenuHeader);
