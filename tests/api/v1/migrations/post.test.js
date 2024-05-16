import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST - api/v1/migrations should return with status 200", async () => {
  const postResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(postResponse.status).toBe(201);

  const runMigrations = await postResponse.json();

  expect(Array.isArray(runMigrations)).toBe(true);
  expect(runMigrations.length).toBeGreaterThan(0);

  const postResponse2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const migrationToRun = await postResponse2.json();

  expect(migrationToRun.length).toBe(0);
});
