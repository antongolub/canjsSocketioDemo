define(["socketio"],function(o){var n=document.location;return o.connect(n.protocol+"//"+n.hostname+":8000")});