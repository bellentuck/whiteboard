// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, { draw } from './whiteboard';
import io from 'socket.io-client';

// Example: Draw a single stroke.
//draw([0, 0], [250, 250], 'red', true);

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('load', strokes => {
  strokes.forEach(stroke => {
    const { start, end, color } = stroke;
    draw(start, end, color, false);
  });
});

// render published draws to screen
socket.on('draw', (...payload) => {
  // console.log(payload);
  draw(...payload, false);
});

// let others know about a particular drawing
whiteboard.on('draw', (...payload) => {
  socket.emit('draw', ...payload);
});


