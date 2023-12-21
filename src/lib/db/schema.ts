import { relations, sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("role", ["user", "assistant"]);

export const chats = pgTable("chats", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  fileUrl: text("file_url").notNull(),
  filename: varchar("filename", { length: 100 }).notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatRelations = relations(chats, ({ many }) => ({
  messages: many(messages),
}));

export const messages = pgTable("messages", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  content: text("content").notNull(),
  chatId: uuid("chat_id").references(() => chats.id),
  role: rolesEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));
