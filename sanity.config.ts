import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3hsy3exe',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'MRND Studio',
  schema,
  plugins: [
    structureTool(),
  ],
});
