import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'internetSpeed'
})
export class InternetSpeedPipe implements PipeTransform {
  private gigabit = {
    houses: 10,
    order: 1_000_000_000,
    string: 'Gbit/s',
  };
  private megabit = {
    houses: 7,
    order: 1_000_000,
    string: 'Mbit/s',
  }
  private kilobit = {
    houses: 4,
    order: 1_000,
    string: 'Kbit/s'
  }

  transform(value: number): string {
    const stringNumber = value.toString();

    if(stringNumber.length >= this.gigabit.houses) {
      return this.format(
        value,
        this.gigabit.order,
        this.gigabit.string
      );

    } else if(stringNumber.length >= this.megabit.houses) {
      return this.format(
        value,
        this.megabit.order,
        this.megabit.string,
      );

    } else if (stringNumber.length >= this.kilobit.houses) {
      return this.format(
        value,
        this.kilobit.order,
        this.kilobit.string
      );
    }

    return this.format(value, 1, 'Bit/s');
  }

  format(value: number, order: number, orderString: string): string {
    return `${(value / order).toFixed(0)} ${orderString}`;
  }

}
