// @ts-check
const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname, "../migrations");

const allFiles = fs.readdirSync(migrationsDir);

const migrationFiles = allFiles.filter(file => file.endsWith("Migration.js"));

const migrate = async () => {
    for (const file of migrationFiles) {
        const migrationPath = path.join(migrationsDir, file);
        const MigrationClass = require(migrationPath);
        const migrationInstance = new MigrationClass();
        console.log(`Running migration: ${file}`);
        await migrationInstance.up();
        console.log(`Migration completed: ${file}`);
    }
}

migrate().then(() => {
    console.log("All migrations completed.");
    process.exit(0);
}).catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});