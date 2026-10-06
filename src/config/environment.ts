import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const useMock = process.env.USE_MOCK?.toLowerCase() === 'true';