import { CONFIG } from 'src/app/core/constants';
import { LaunchesFormatterPipe } from './launch-name-mapper.pipe';

describe('LaunchesFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new LaunchesFormatterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an array slice of values if showDetails is false', () =>{
    const pipe = new LaunchesFormatterPipe();
    let originArr =  Array(50).fill(0);
    originArr.forEach((v, i) => {id: (i + 1).toString(); name: `name ${i + 1}`});

    const actualResult = pipe.transform(originArr, false);

    const expectedResult = originArr.
    slice(0, CONFIG.showMoreThreshold)
    .map((v) => v.name)
    .join(' &nbsp; ');
    expect(expectedResult).toEqual(actualResult);
  });

  it('should return an array slice of values if showDetails is true', () =>{
    const pipe = new LaunchesFormatterPipe();
    let originArr =  Array(50).fill(0);
    originArr.forEach((v, i) => {id: (i + 1).toString(); name: `name ${i + 1}`});

    const actualResult = pipe.transform(originArr, true);

    const expectedResult = originArr
    .map((v) => v.name).join(' &nbsp; ');
    expect(expectedResult).toEqual(actualResult);
  });
});
