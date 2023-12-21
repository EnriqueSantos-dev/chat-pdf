import * as schema from "./schema";

import { InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { chats, messages } from "./schema";

const connectionString = process.env.DATABASE_URL as string;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

export type Chat = InferSelectModel<typeof chats>;
export type Message = InferSelectModel<typeof messages>;
