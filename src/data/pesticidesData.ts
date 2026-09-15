import { ChemicalProduct } from '../types';
import { INSECTICIDES_DATABASE } from './insecticidesData';
import { FUNGICIDES_DATABASE } from './fungicidesData';
import { HERBICIDES_DATABASE } from './herbicidesData';
import { MITICIDES_DATABASE } from './miticidesData';
import { BIO_AND_OTHER_DATABASE } from './bioAndOtherData';

export const PESTICIDES_DATABASE: ChemicalProduct[] = [
  ...INSECTICIDES_DATABASE,
  ...FUNGICIDES_DATABASE,
  ...HERBICIDES_DATABASE,
  ...MITICIDES_DATABASE,
  ...BIO_AND_OTHER_DATABASE,
];

export const CROP_LIST: string[] = [
  'All Crops',
  'Rice',
  'Potato',
  'Tomato',
  'Brinjal',
  'Mango',
  'Jute',
  'Tea',
  'Cabbage',
  'Cauliflower',
  'Chili',
  'Chilli',
  'Bean',
  'Wheat',
  'Sugarcane',
  'Onion',
  'Cotton',
  'Maize',
  'Cucumber',
  'Bitter Gourd',
  'Pointed Gourd',
  'Mustard',
  'Groundnut',
  'Store & Field',
  'Warehouse'
];
