// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, { draw } from './whiteboard';

// Example: Draw a single stroke.
draw([0, 0], [250, 250], 'red', true);
const socket = io(window.location.origin);

whiteboard.on('draw', payload => {
  socket.emit('draw', payload);
});

socket.on('connect', message => {
  console.log(message);
});

socket.on('updateDrawing', (payload) => {
  console.log(payload);
  draw(payload, payload, 'red', false);
});
