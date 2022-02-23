import { NotFoundException } from '@nestjs/common';

class DrawingNotFoundException extends NotFoundException {
  constructor(drawingId: number) {
    super(`Drawing with id ${drawingId} not found`);
  }
}

export default DrawingNotFoundException;
