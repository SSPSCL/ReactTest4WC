import Rover from "./rover";

export default class RoversController {
  constructor(instructions) {
    this.InitialiseFromInstructions(instructions);
  }

  get Valid() {
    return this.valid;
  }

  Execute() {
    let result = '';
    
    if ((!this.rovers) || (this.rovers.length < 1)) {
      this.valid = false;
      return '';
    }

    for (var countRover = 0; countRover < this.rovers.length; countRover++) {
      var currentRover = this.rovers[countRover];
      currentRover.Drive(this.roverInstructions[countRover]);

      if (!currentRover.Valid) {
        this.valid = false;
        return;
      }

      result += `${currentRover.X} ${currentRover.Y} ${currentRover.Orientation}\n`;
    }

    return result;
  }

  InitialiseFromInstructions(instructions) {
    this.rovers = [];
    this.roverInstructions = [];
    this.valid = true;

    let boundaryX = 0;
    let boundaryY = 0;

    if ((!instructions) || !(instructions.split)) {
      this.valid = false;
      return;
    }

    let instructionLines = instructions.split("\n");
    if (instructionLines.length < 3) {
      this.valid = false;
      return;
    }

    let boundariesSplit = instructionLines[0].split(" ");

    if (boundariesSplit.length !== 2) {
      this.valid = false;
      return;
    }

    boundaryX = parseInt(boundariesSplit[0], 10);
    boundaryY = parseInt(boundariesSplit[1], 10);

    if (isNaN(boundaryX) || isNaN(boundaryY)) {
      this.valid = false;
      return;
    }
    if (boundaryX <= 0 || boundaryY <= 0) {
      this.valid = false;
      return;
    }

    let currentLine = 1;
    while (currentLine < instructionLines.length) {
      if ((instructionLines.length - currentLine) < 2) {
        break;
      }

      let roverLocationAndOrientation = instructionLines[currentLine];
      if (!roverLocationAndOrientation) {
        break;
      }

      let roverLocationAndOrientationSplit = roverLocationAndOrientation.split(' ');

      let roverOrientation = 'N';
      let roverX = 0;
      let roverY = 0;

      if (roverLocationAndOrientationSplit.length !== 3) {
        this.valid = false;
        return;
      }
      roverX = parseInt(roverLocationAndOrientationSplit[0], 10);
      roverY = parseInt(roverLocationAndOrientationSplit[1], 10);

      if (isNaN(roverX) || isNaN(roverY)) {
        this.valid = false;
        return;
      }

      if ((roverX < 0) || (roverX > boundaryX) || (roverY < 0) || (roverY > boundaryY)) {
        this.valid = false;
        return;
      }

      switch (roverLocationAndOrientationSplit[2]) {
        case 'N':
        case 'E':
        case 'S':
        case 'W':
          roverOrientation = roverLocationAndOrientationSplit[2];
          break;

        default:
          this.valid = false;
          return;
      }

      let roverInstructions = instructionLines[currentLine + 1];
      this.rovers.push(new Rover(roverX, roverY, roverOrientation, boundaryX, boundaryY));
      this.roverInstructions.push(roverInstructions);

      currentLine += 2;
    }

    if (this.rovers.length < 1) {
      this.valid = false;
      return;
    }
  }
}
