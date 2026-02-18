import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertLetter, Letter, users, letters, ensureReactions } from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from "nanoid";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Letter queries
export async function createLetter(data: Omit<InsertLetter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Letter> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const id = nanoid();
  const letter: InsertLetter = {
    ...data,
    id,
    reactions: JSON.stringify({}),
  };

  await db.insert(letters).values(letter);
  
  const result = await db.select().from(letters).where(eq(letters.id, id)).limit(1);
  return result[0] as Letter;
}

export async function getAllLetters(): Promise<Letter[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(letters).orderBy(letters.createdAt);
  return result as Letter[];
}

export async function getLetterById(id: string): Promise<Letter | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(letters).where(eq(letters.id, id)).limit(1);
  return result[0] as Letter | undefined;
}

export async function addReactionToLetter(letterId: string, emoji: string): Promise<Letter> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const letter = await getLetterById(letterId);
  if (!letter) {
    throw new Error("Letter not found");
  }

  const reactions = ensureReactions(letter.reactions ? JSON.parse(letter.reactions) : {});
  reactions[emoji] = (reactions[emoji] || 0) + 1;

  await db.update(letters)
    .set({ reactions: JSON.stringify(reactions) })
    .where(eq(letters.id, letterId));

  const updated = await getLetterById(letterId);
  return updated as Letter;
}
