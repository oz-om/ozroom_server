module.exports = (client, io) => {
  client.on("initRoom", (clientId) => {
    client.join(clientId);
    io.to(client.id).emit("room_initialized");
  });
  client.on("callRequest", (request) => {
    const { senderRequest, receiverRequest } = request;
    io.to(receiverRequest).emit("receiveCallRequest", { senderRequest });
  });
  client.on("joinToRoom", (request) => {
    client.join(request.room);
  });
  client.on("requestIntegrationCalls", (request) => {
    io.to(request.receiverId).emit("requestIntegrationCalls", request.senderId);
  });

  client.on("makeIntegrationCalls", (request) => {
    io.to(request.receiverId).emit("makeIntegrationCalls", request.Peers);
  });

  client.on("integrateCallRequest", (request) => {
    io.to(request.receiverId).emit("integrateCallRequest", request.sender);
  });

  client.on("admin_control_video_tracks", (targets) => {
    io.to(targets.member).emit("admin_control_video_tracks", { id: targets.targetUser, controlledByAdmin: targets.controlledByAdmin });
  });
  client.on("admin_control_audio_tracks", (targets) => {
    io.to(targets.member).emit("admin_control_audio_tracks", { id: targets.targetUser, controlledByAdmin: targets.controlledByAdmin });
  });
  client.on("controlled_his_video_track", (trackDetails) => {
    io.to(trackDetails.member).emit("controlled_his_video_track", { id: trackDetails.targetUser, selfControlled: trackDetails.selfControlled });
  });
  client.on("controlled_his_audio_track", (trackDetails) => {
    io.to(trackDetails.member).emit("controlled_his_audio_track", { id: trackDetails.targetUser, selfControlled: trackDetails.selfControlled });
  });

  client.on("reject", (receiverId) => {
    io.to(receiverId).emit("rejected");
  });
  client.on("meetingEnded", (receiverId) => {
    io.to(receiverId).emit("meetingEnded");
  });
  client.on("memberEndCall", (request) => {
    io.to(request.receiverId).emit("memberEndCall", request.targetMember);
  });
  client.on("adminKillMember", (request) => {
    io.to(request.receiverId).emit("adminKillMember", request.targetMember);
  });

  client.on("sendMessage", (msg) => {
    if (msg.to == "group") {
      client.to(msg.room).emit("receive_msg", msg);
    } else {
      io.to(msg.to.socketId).emit("receive_msg", msg);
    }
  });
};
