const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

function joinRoom(connection, id, ws, sharedDb) {
  const doc = connection.get("text-editor", id);
  doc.fetch(function (err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create([{ insert: "Hi!" }], "rich-text");
      const jsonStream = new WebSocketJSONStream(ws);
      sharedDb.listen(jsonStream);
      return;
    }
  });
}

module.exports = {
  joinRoom,
};
