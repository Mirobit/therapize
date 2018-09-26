import React, { Component } from "react";
import Video from "twilio-video";
import api from "../utils/api";
import { Button, Message, Card, Segment, Loader } from "semantic-ui-react";

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: null,
      roomName: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: null,
      remoteConnection: false
    };

    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
  }

  componentDidMount() {
    this.setState({ roomName: localStorage.getItem("roomid") });
    console.log(this.state.roomName);
    api.get("/api/chat/token").then(results => {
      const { identity, token } = results;
      this.setState({ identity, token });
      let connectOptions = {
        name: this.state.roomName
      };

      Video.connect(
        this.state.token,
        connectOptions
      ).then(this.roomJoined, error => {
        console.log(error.message);
      });
    });
  }
  componentWillUnmount() {
    this.leaveRoom();
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
      previewContainer.querySelector("video").className = "localvideo";
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(participant => {
      this.setState({ remoteConnection: true });
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
      //previewContainer.querySelector("video").className = "remotevideo";
    });

    // When a Participant joins the Room, log the event.
    room.on("participantConnected", participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on("trackSubscribed", (track, participant) => {
      console.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on("trackUnsubscribed", (track, participant) => {
      console.log(participant.identity + " removed track: " + track.kind);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on("participantDisconnected", participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  render() {
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <Segment
          style={{
            marginTop: "2em",
            marginLeft: "10px",
            height: "250px",
            width: "330px",
            backgroundColor: " #ffffff"
          }}
        >
          <div ref="localMedia" />
        </Segment>
      </div>
    ) : (
      <Segment
        style={{ marginTop: "2em", marginLeft: "10px", height: "255px", width: "330px" }}
        loading
      />
    );
    let showRemoteTrack = this.state.remoteConnection ? (
      <Segment style={{ marginTop: "2em", height: "510px", width: "670px" }}>
        <div className="flex-item" ref="remoteMedia" id="remote-media" />
      </Segment>
    ) : (
      <Segment style={{ marginTop: "2em", height: "510px", width: "670px" }} loading>
        <span style={{ color: "black" }}>Waiting for participant...</span>
      </Segment>
    );
    return (
      <div>
        <div className="flex-container">
          {showRemoteTrack}
          {showLocalTrack}
        </div>
      </div>
    );
  }
}

export default VideoComponent;
