import { relations } from "drizzle-orm";
import {
  index,
  char,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users",{
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    mobile: varchar("phoneNumber", { length: 100 }).notNull(),
    authority:char("authority").notNull().default('D'),
    disable:boolean("disable").notNull().default(false),
    imageURL: varchar('imageURL'),
    hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndexOfUsers: index("display_id_index_of_users").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
    phoneIndex:index("phone_index").on(table.mobile),
  }),
);
export const usersRelations = relations(usersTable, ({ many }) => ({
  // teacherToCourse: many(teacherToCourse),
  records:many(courseRecordTable),
  teacher:many(teacherToCourse),
  responses: many(idpResponseTable),
  experiences: many(experiencesTable), 
}));
export const experiencesTable = pgTable("experiences",{
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().references(() => usersTable.email, {
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }),
  semester: varchar("semester",{length:5}).notNull().default(""),
  school: varchar("school").notNull().default(""),
  position: varchar("position").notNull().default(""),
  subject: varchar("subject").notNull().default(""),
  role: varchar("role").notNull().default(""),
  feature: varchar("feature").notNull().default(""),
});
export const experiencesRelations = relations(experiencesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [experiencesTable.email],
    references: [usersTable.email],
  }),
}));
export const courseTable= pgTable("course",{
    id:serial("id").primaryKey(),
    year:varchar("year").notNull(),
    series:varchar("series").notNull(),
    courseId:varchar("courseId").notNull().unique(),
    name:varchar("name",{length:100}).notNull(),
    date:varchar("date",{length:50}).notNull(),
    teachername:varchar("teachername").notNull(),
    typeId:varchar("typeId").notNull().references(()=>courseMapTable.id,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  },
);
export const courseRelations=relations(courseTable,({one,many})=>({
  teacher: many(teacherToCourse),
  // teacher:one(usersTable,{
  //   fields:[courseTable.teachername],
  //   references:[usersTable.username],
  // }),
  records:many(courseRecordTable),
  type:one(courseMapTable,{
    fields:[courseTable.typeId],
    references:[courseMapTable.id],
  }),
}));
export const teacherToCourse=pgTable("teacherToCourse",{
    id:serial("id").primaryKey(),
    teacherEmail:varchar("teacherEmail").notNull().references(()=>usersTable.email,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    courseId:varchar("courseId").notNull().references(()=>courseTable.courseId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  },
);
export const teacherToCourseRelations=relations(teacherToCourse,({one})=>({
  course: one(courseTable, {
    fields: [teacherToCourse.courseId],
    references: [courseTable.courseId],
  }),
  teacher: one(usersTable, {
    fields: [teacherToCourse.teacherEmail],
    references: [usersTable.email],
  }),
}));
export const courseRecordTable=pgTable("courseRecord",{
    id:serial("id").primaryKey(),
    studentEmail:varchar("studentEmail", { length: 100 }).notNull().references(()=>usersTable.email,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    courseId:varchar("courseId").notNull().references(()=>courseTable.courseId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    qualification1:varchar("qualification1").default(""),
    qualification2:varchar("qualification2").default(""),
    quantification1:varchar("quantification1").default(""),
    quantification2:varchar("quantification2").default(""),
  },
);
export const recordRelations=relations(courseRecordTable,({one})=>({
  student:one(usersTable,{
    fields: [courseRecordTable.studentEmail],
    references:[usersTable.email],
  }),
  course:one(courseTable,{
    fields: [courseRecordTable.courseId],
    references: [courseTable.courseId],
  })
}));
export const courseMapTable=pgTable("courseMap",{
    idPrimary:serial("idPrimary").primaryKey(),
    id:varchar("id",{length:50}).notNull().unique(),
    bigCategory:varchar("bigCategory",{length:50}).notNull(),
    middleCategory:varchar("middleCategory",{length:50}).notNull(),
    smallCategory:varchar("smallCategory",{length:50}).notNull(),
    required:boolean("required").notNull(),
    applicable:varchar("applicable",{length:50}).notNull(),
  },
);
export const courseMapRelations=relations(courseMapTable,({many})=>({
  course:many(courseTable),
}));

// IDP tables
// save different version idp problems
export const idpProblemTable=pgTable("idpProblem",{
  versionId: serial("id").primaryKey(),
  data: jsonb('data')
    .array()
    .notNull()
    // .$type<Section>(),
});
// save each semester idp status
export const idpStatusTable=pgTable("idpStatus",{
  id: serial("id").primaryKey(),
  semester: varchar("semester").notNull().unique(),
  updateTime: varchar("updateTime").notNull(),
  versionId: integer("versionId").notNull(),
  released: boolean("released").notNull().default(false),
});
// save responses
export const idpResponseTable=pgTable("idpResponse",{
  id: serial("id").primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  // userId: varchar("userId").notNull(),
  email: varchar("email", { length: 100 }).notNull().references(() => usersTable.email, {
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }),
  semester: varchar("semester").notNull(),
  updateTime: varchar("updateTime").notNull(),
  status: char("status").notNull().default("a"),
  response: jsonb('response').notNull().default({}),
  notes: varchar("notes").notNull().default(""),
});

export const idpResponseRelations = relations(idpResponseTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [idpResponseTable.email],
    references: [usersTable.email],
  }),
}));