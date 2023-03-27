import { InternetSpeedPipe } from './internet-speed.pipe';

describe('InternetSpeedPipe', () => {
  it('create an instance', () => {
    const pipe = new InternetSpeedPipe();
    expect(pipe).toBeTruthy();
  });

  it('should trasform in gigabits', () => {
    const pipe = new InternetSpeedPipe();
    const gigaValue = 1_000_000_000;
    const transformedValue = pipe.transform(gigaValue);

    expect(transformedValue).toBe('1 Gbit/s');
  });

  it('should trasform in megabits', () => {
    const pipe = new InternetSpeedPipe();
    const megaValue = 1_000_000;
    const transformedValue = pipe.transform(megaValue);

    expect(transformedValue).toBe('1 Mbit/s');
  });

  it('should trasform in kilobits', () => {
    const pipe = new InternetSpeedPipe();
    const kiloValue = 1_000;
    const transformedValue = pipe.transform(kiloValue);

    expect(transformedValue).toBe('1 Kbit/s');
  });

  it('should trasform in bits', () => {
    const pipe = new InternetSpeedPipe();
    const bitValue = 1;
    const transformedValue = pipe.transform(bitValue);

    expect(transformedValue).toBe('1 Bit/s');
  });
});
