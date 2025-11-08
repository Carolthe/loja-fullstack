// @ts-check
const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname, "../migrations");

const allFiles = fs.readdirSync(migrationsDir).reverse();

const migrate = async () => {
    for (const file of allFiles) {
        const migrationPath = path.join(migrationsDir, file);
        const MigrationClass = require(migrationPath);
        const migrationInstance = new MigrationClass();
        console.log(`Running migration: ${file}`);
        await migrationInstance.down();
        console.log(`Migration completed: ${file}`);
    }
}

migrate().then(() => {
    console.log("All migrations rolled back.");
    process.exit(0);
}).catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});