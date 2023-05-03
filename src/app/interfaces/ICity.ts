import ICityWithoutPointOfInterest from './ICityWithoutPointOfInterest';
import IPointOfInterest from './IPointOfInterest';

export default interface ICity extends ICityWithoutPointOfInterest {
  pointsOfInterest: IPointOfInterest[];
  numberOfPointsOfInterest: number;
}
