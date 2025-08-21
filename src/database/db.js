import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import { Platform } from 'react-native';
import CryptoJS from 'crypto-js';

SQLite.enablePromise(true);

let db = null;

const normalizeText = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const encryptPassword = (password) => {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

export const initDB = async () => {
  if (db) return db;

  try {
    db = await SQLite.openDatabase({
      name: 'tablas.db',
      location: 'default',
    });

    console.log('DB "tablas.db" inicializada correctamente');

    await db.executeSql(`DROP TABLE IF EXISTS users;`);
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    await db.executeSql(`DROP TABLE IF EXISTS peliculas;`);
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS peliculas (
        id INTEGER PRIMARY KEY,
        titulo TEXT,
        categoria TEXT,
        ranking REAL,
        likes INTEGER,
        image TEXT
      );
    `);

    let csvData = '';
    if (Platform.OS === 'android') {
      csvData = await RNFS.readFileAssets('peliculas.csv', 'utf8');
    } else {
      csvData = await RNFS.readFile(`${RNFS.MainBundlePath}/peliculas.csv`, 'utf8');
    }

    const parsed = Papa.parse(csvData, { header: true });

    await db.transaction((tx) => {
      parsed.data.forEach((row) => {
        if (row.titulo) {
          const categoriaNormalized = normalizeText(row.categoria);
          tx.executeSql(
            `INSERT OR REPLACE INTO peliculas (id, titulo, categoria, ranking, likes, image) VALUES (?, ?, ?, ?, ?, ?);`,
            [
              parseInt(row.id),
              row.titulo,
              categoriaNormalized,
              parseFloat(row.ranking) || 0,
              parseInt(row.likes) || 0,
              row.image || 'avatar.png',
            ]
          );
        }
      });
    });

    await saveUser('Prueba1', 'PRUE123');
    await saveUser('Julian', 'Juli123');
    await saveUser('Claudia', 'Clau321');

    await db.close();
    db = null;

    if (Platform.OS === 'android') {
      const internalDbPath = `/data/data/com.PELIS/databases/tablas.db`;
      const externalDbPath = `${RNFS.DownloadDirectoryPath}/tablas.db`;

      const exists = await RNFS.exists(internalDbPath);
      if (exists) {
        await RNFS.copyFile(internalDbPath, externalDbPath); 
        console.log('DB física copiada a:', externalDbPath);
      } else {
        console.log('No se encontró el archivo DB para copiar');
      }
    }

    db = await SQLite.openDatabase({ name: 'tablas.db', location: 'default' });

    return db;
  } catch (err) {
    console.log('Error inicializando DB:', err);
    throw err;
  }
};

export const saveUser = async (email, password) => {
  if (!db) throw new Error('DB no inicializada');
  try {
    const encrypted = encryptPassword(password);
    await db.executeSql(
      'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?);',
      [email, encrypted]
    );
  } catch (err) {
    console.log('Error guardando usuario:', err);
  }
};

export const validateLogin = async (email, password) => {
  if (!db) throw new Error('DB no inicializada');
  try {
    const encrypted = encryptPassword(password);
    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, encrypted]
    );
    return results.rows.length > 0;
  } catch (err) {
    console.log('Error validando login:', err);
    throw err;
  }
};

export default db;
