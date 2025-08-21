import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import colors from '../../../../res/colors';
import assetsMap from '../../../../assets/assetsMap';

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 15;
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = 380;

const ImageSlider = ({ peliculas }) => {
  const flatListRef = useRef(null);

  const topPeliculas = peliculas
    ? [...peliculas].sort((a, b) => b.likes - a.likes).slice(0, 3)
    : [];

  useEffect(() => {
    if (topPeliculas && topPeliculas.length >= 2) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 1,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }, [topPeliculas]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={assetsMap[item.image] || require('../../../../assets/avatar.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{item.titulo}</Text>
    </View>
  );

  const onScrollToIndexFailed = (info) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 100);
  };

  if (!topPeliculas || topPeliculas.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>🎬 Favoritas del público</Text>
      <FlatList
        ref={flatListRef}
        data={topPeliculas}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
          alignItems: 'center',
        }}
        snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
        decelerationRate="fast"
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
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
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: ITEM_MARGIN,
  },
  image: { width: '100%', height: ITEM_HEIGHT - 60, resizeMode: 'cover' },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default ImageSlider;
