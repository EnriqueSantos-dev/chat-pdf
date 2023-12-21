ALTER TABLE "chats" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "text";