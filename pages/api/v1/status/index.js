import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsResult.rows[0].max_connections;

  const DB_NAME = process.env.POSTGRES_DB;
  const dbOpenConnectionsResult = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname=$1;",
    values: [DB_NAME],
  });

  const dbOpenConnections = dbOpenConnectionsResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnections),
        open_connections: parseInt(dbOpenConnections),
      },
    },
  });
}

export default status;
