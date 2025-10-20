// lib/sanityImage.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client'; // your Sanity client
import { Image } from 'sanity';
const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}
