import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const assetClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
});

if(!assetClient.config().token) {
    throw new Error("Write client token not found.")
};
