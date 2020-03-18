export default class Rover {
  constructor(x, y, orientation, boundaryX, boundaryY) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.boundaryX = boundaryX;
    this.boundaryY = boundaryY;

    this.valid = true;
  }

  get BoundaryX() {
    return this.boundaryX;
  }
  get BoundaryY() {
    return this.boundaryY;
  }
  get Orientation() {
    return this.orientation;
  }
  get Valid() {
    return this.valid;
  }
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }

  Drive(instructions) {
    const DriveStep = (instruction) => {
      let orientationOrdinal = 0;

      switch (instruction) {
        case "L":
          orientationOrdinal = this.OrientationOrdinal(this.orientation);
          orientationOrdinal -= 1;
          this.orientation = this.OrientationSymbolic(orientationOrdinal);
          break;

        case "M":
          switch (this.orientation) {
            case "N":
              if (this.y < this.boundaryY) {
                this.y += 1;
              }
              break;
            case "E":
              if (this.x < this.boundaryX) {
                this.x += 1;
              }
              break;
            case "S":
              if (this.y > 0) {
                this.y -= 1;
              }
              break;
            case "W":
              if (this.x > 0) {
                this.x -= 1;
              }
              break;

            default:
              this.valid = false;
              return;
          }
          break;

        case "R":
          orientationOrdinal = this.OrientationOrdinal(this.orientation);
          orientationOrdinal += 1;
          this.orientation = this.OrientationSymbolic(orientationOrdinal);
          break;

        default:
          this.valid = false;
          return;
      }
    };

    if (
      instructions === null ||
      (typeof (instructions) === "undefined") ||
      !instructions.toUpperCase
    ) {
      return;
    }

    var instructionsRegular = instructions.toUpperCase();

    for (
      var countChar = 0;
      countChar < instructionsRegular.length;
      countChar++
    ) {
      DriveStep(instructionsRegular.substr(countChar, 1));
    }
  }

  OrientationOrdinal(orientation) {
    var result;

    switch (orientation) {
      case "N":
        result = 0;
        break;
      case "E":
        result = 1;
        break;
      case "S":
        result = 2;
        break;
      case "W":
        result = 3;
        break;

      default:
        this.valid = false;
        return;
    }

    return result;
  }

  OrientationSymbolic(orientationOrdinal) {
    let currentOrientationOrdinal = orientationOrdinal;
    while (currentOrientationOrdinal > 3) {
      currentOrientationOrdinal -= 4;
    }
    while (currentOrientationOrdinal < 0) {
      currentOrientationOrdinal += 4;
    }

    let result = 0;
    switch (currentOrientationOrdinal) {
      case 0:
        result = "N";
        break;
      case 1:
        result = "E";
        break;
      case 2:
        result = "S";
        break;
      case 3:
        result = "W";
        break;

      default:
        this.valid = false;
        return;
    }

    return result;
  }
}
