import { EncryptionOptions } from 'typeorm-encrypted';

import * as dotenv from 'dotenv';
dotenv.config();

export const AppEncryptionTransformerConfig: EncryptionOptions = {
  key: process.env.ENCRYPTION_KEY,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
};
