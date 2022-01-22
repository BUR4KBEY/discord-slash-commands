import { config } from 'dotenv';

import CustomClient from './structures/CustomClient';

config();

const client = new CustomClient();

client.start();
