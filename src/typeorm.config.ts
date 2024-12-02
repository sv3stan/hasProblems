import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source';

const AppDataSource = new DataSource({
  ...dataSourceOptions,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
