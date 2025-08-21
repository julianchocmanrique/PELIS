import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import Header from '../home/header/Header';
import GeneralContainer from './generalContainer/GeneralContainer';
import { initDB } from '../../database/db';
import colors from '../../res/colors';
import ImageSlider from './header/components/ImageSlider';
import assetsMap from '../../assets/assetsMap';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const H_PADDING = 12;
const GAP = 10;
const CARD_WIDTH = (width - H_PADDING * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const normalizeText = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'home',
      categoriaSeleccionada: '',
      peliculasTop: [],
      peliculasDB: [],
      peliculasFiltradas: [],
      cantidadVisible: 9,
      searchTexto: '',
      database: null,
    };
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonEvent);
    this.initAndLoad();
  }

  componentWillUnmount() {
    this.BackHandler?.remove();
  }

  onBackButtonEvent = () => {
    BackHandler.exitApp();
    return true;
  };

  initAndLoad = async () => {
    try {
      const database = await initDB();
      this.setState({ database }, () => {
        this.cargarPeliculasHome();
      });
    } catch (err) {
      console.log('Error inicializando DB en Home:', err);
    }
  };

  onSelectTab = (tab, categoria = '') => {
    this.setState({ activeTab: tab, categoriaSeleccionada: categoria, cantidadVisible: 9 }, () => {
      if (tab === 'home') this.cargarPeliculasHome();
      else if (tab === 'peliculas') this.cargarPeliculasCategoria(categoria);
    });
  };

  cargarPeliculasHome = async () => {
    const { database } = this.state;
    if (!database) return;
    try {
      const [results] = await database.executeSql('SELECT * FROM peliculas ORDER BY ranking DESC, id ASC;');
      const peliculas = [];
      for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        peliculas.push({
          id: row.id.toString(),
          titulo: row.titulo,
          image: row.image,
          imagen: assetsMap[row.image] || require('../../assets/avatar.png'),
          likes: row.likes ?? 0,
          ranking: row.ranking ?? 0,
        });
      }
      const topPorLikes = [...peliculas].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, 3);
      this.setState({
        peliculasTop: topPorLikes,
        peliculasDB: peliculas,
        peliculasFiltradas: peliculas,
      });
    } catch (err) {
      console.log('Error cargando peliculas home:', err);
    }
  };

  cargarPeliculasCategoria = async (categoriaParam) => {
    const { database } = this.state;
    if (!database) return;
    try {
      const categoria = normalizeText(categoriaParam);
      const [results] = await database.executeSql(
        'SELECT * FROM peliculas WHERE categoria = ? ORDER BY ranking DESC, id ASC;',
        [categoria]
      );
      const todas = [];
      for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        todas.push({
          id: row.id.toString(),
          titulo: row.titulo,
          categoria: row.categoria,
          image: row.image,
          imagen: assetsMap[row.image] || require('../../assets/avatar.png'),
          likes: row.likes ?? 0,
          ranking: row.ranking ?? 0,
        });
      }
      const topPorLikes = [...todas].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, 3);
      this.setState({
        peliculasTop: topPorLikes,
        peliculasDB: todas,
        peliculasFiltradas: todas,
      });
    } catch (err) {
      console.log('Error cargando peliculas por categoria:', err);
    }
  };

  filtrarPeliculas = (texto) => {
    const { peliculasDB } = this.state;
    const filtro = texto.toLowerCase();
    const filtradas = peliculasDB.filter((p) => p.titulo.toLowerCase().includes(filtro));
    this.setState({ peliculasFiltradas: filtradas });
  };

  renderItem = ({ item }) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Image source={item.imagen} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </View>
  );

  renderFooter = () => {
    const { cantidadVisible, peliculasFiltradas } = this.state;
    if (cantidadVisible >= peliculasFiltradas.length) return null;
    return (
      <TouchableOpacity style={styles.verMasBtn} onPress={() => this.setState({ cantidadVisible: cantidadVisible + 9 })}>
        <Text style={styles.verMasText}>Ver más</Text>
      </TouchableOpacity>
    );
  };

  renderContent = () => {
    const { peliculasFiltradas, cantidadVisible, activeTab, peliculasTop, searchTexto, categoriaSeleccionada } = this.state;
    const data = peliculasFiltradas.slice(0, cantidadVisible);
    const headerComponent = () => {
      if (activeTab === 'home' && !searchTexto) {
        return (
          <View>
            {peliculasTop.length > 0 && <ImageSlider peliculas={peliculasTop} />}
            <Text style={styles.listTitle}>🏆 Películas con más ranking</Text>
          </View>
        );
      } else if (activeTab === 'peliculas') {
        return <Text style={styles.categoriaTitulo}>{categoriaSeleccionada.toUpperCase()}</Text>;
      }
      return null;
    };
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
        contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingTop: 8, paddingBottom: 160 }}
        ListHeaderComponent={headerComponent()}
        ListFooterComponent={this.renderFooter}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          onSearch={(texto) => {
            this.filtrarPeliculas(texto);
            this.setState({ searchTexto: texto });
          }}
        />
        <View style={{ flex: 1 }}>{this.renderContent()}</View>
        <View style={styles.fixedMenu}>
          <GeneralContainer onSelectTab={this.onSelectTab} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  card: { backgroundColor: colors.secondary, borderRadius: 8, padding: 6, alignItems: 'center' },
  cardImage: { width: '100%', height: 120, borderRadius: 6, resizeMode: 'cover' },
  cardTitle: { marginTop: 4, fontSize: 14, fontWeight: '700', color: colors.white, textAlign: 'center' },
  verMasBtn: { marginTop: 10, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: colors.gray6, borderRadius: 6, alignSelf: 'center', marginBottom: 20 },
  verMasText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  fixedMenu: { width: '100%', backgroundColor: colors.white, shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.4, shadowRadius: 4, elevation: 10 },
  categoriaTitulo: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 12, color: colors.white },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
    backgroundColor: colors.gray6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Home;
