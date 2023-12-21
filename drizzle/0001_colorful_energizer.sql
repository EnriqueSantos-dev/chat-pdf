ALTER TABLE "chats" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();