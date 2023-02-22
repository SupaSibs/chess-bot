interface Position {
  position: board;
  materialImbalance: number;
  centerSquares: any[];
}
export class BoardBoiler implements Position {
    position: board;
  materialImbalance: number;
  centerSquares: any[];
  constructor(position: board = baseBoard, materialImbalance: number = 0) {
    this.position = position;
    this.materialImbalance = materialImbalance;
    this.centerSquares = [
      this.position.d[4 - 1],
      this.position.e[4 - 1],
      this.position.d[4 - 1],
      this.position.e[4 - 1],
    ];
  }

  getMovementDirection(
    oldX: number,
    oldY: number,
    newX: number,
    newY: number
  ): number {
    let direction: number;
    direction = 0;
    if (Math.abs(newX - oldX) === Math.abs(newY - oldY)) {
      switch (true) {
        case newX - oldX > 0 && newY - oldY > 0: //top right
          direction = 1;
          break;
        case newX - oldX < 0 && newY - oldY > 0: // top left
          direction = 2;
          break;
        case newX - oldX > 0 && newY - oldY < 0: // bottom rignt
          direction = 3;
          break;
        case newX - oldX < 0 && newY - oldY < 0: // bottom left
          direction = 4;
          break;
      }
    }

    if (Math.abs(newX - oldX) > 0 && Math.abs(newY - oldY) == 0) {
      switch (true) {
        case newX - oldX > 0: //right
          direction = 5;
          break;
        case newX - oldX < 0: //left
          direction = 6;
          break;
      }
    }

    if (Math.abs(newX - oldX) == 0 && Math.abs(newY - oldY) > 0) {
      switch (true) {
        case newY - oldY > 0: //up
          direction = 7;
          break;
        case newY - oldY < 0: //down
          direction = 8;
          break;
      }
    }
    return direction;
  }

  checkCollisions(
    direction: number,
    oldX: any,
    oldY: any,
    newX: any,
    newY: any,
    colour: any
  ) {
    let directionFunc: Function = () => {};
    switch (direction) {
      case 1: //top right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y + i };
        };
        break;
      case 2: //top left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y + i };
        };
        break;
      case 3: //bottom right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y - i };
        };
        break;
      case 4: //bottom left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y - i };
        };
        break;
      case 5: //right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y };
        };
        break;
      case 6: //left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y };
        };
        break;
      case 7: //up
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x, y: y + i };
        };
        break;
      case 8: //down
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x, y: y - i };
        };
        break;
    }
    let pieceDetected: boolean = false;
    let xy: any = { x: 0, y: 0 };
    for (let i = 1; i < 8; i++) {
      xy = directionFunc(oldX, oldY, i);
      if (
        this.position[alphabet[xy.x] as unknown as keyof typeof this.position][
          xy.y
        ].constructor.name != "Empty"
      ) {
        pieceDetected = true;
        break;
      }
      if (xy.x == newX && xy.y === newY) {
        pieceDetected = false;
        break;
      }
    }

    return pieceDetected;
  }

}