module.exports = (client, io) => {
  client.on("initRoom", (clientId) => {
    console.log(clientId);
    client.join(clientId);
    io.to(clientId).emit("yourRoomInitialized", clientId);
  });
  client.on("requestPeerID", (request) => {
    const { senderRequest, targetRoom, receiverRequest, myPeerId: senderPeerId } = request;
    io.to(receiverRequest).emit("receiveRequestPeer", { senderRequest, senderPeerId, targetRoom });
  });
  client.on("approveRequest", (request) => {
    const { senderRequest, roomPeersId } = request;
    io.to(senderRequest).emit("approved", roomPeersId);
  });
};
