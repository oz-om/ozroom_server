module.exports = (client, io) => {
  client.on("initRoom", (clientId) => {
    client.join(clientId);
    io.to(client.id).emit("room_initialized");
  });
  client.on("requestPeerID", (request) => {
    const { senderRequest, targetRoom, receiverRequest } = request;
    io.to(receiverRequest).emit("receiveRequestPeer", { senderRequest, targetRoom });
  });
  client.on("approveRequest", (request) => {
    const { senderRequest, socketId, roomPeers, accepter } = request;
    client.to(socketId).emit("approved", { roomPeers, accepter });

    // io.sockets.sockets.get(socketId).join(accepter);
  });
  client.on("new_member_join", ({ receiverId, sender }) => {
    client.to(receiverId).emit("new_member_join", sender);
  });
  client.on("admin_control_video_tracks", (targets) => {
    io.to(targets.member).emit("admin_control_video_tracks", { id: targets.targetUser, controlledByAdmin: targets.controlledByAdmin });
  });
  client.on("admin_control_audio_tracks", (targets) => {
    io.to(targets.member).emit("admin_control_audio_tracks", { id: targets.targetUser, controlledByAdmin: targets.controlledByAdmin });
  });
};
