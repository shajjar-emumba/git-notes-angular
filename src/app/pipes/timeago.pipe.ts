import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
  standalone: true,
})
export class TimeagoPipe implements PipeTransform {
  transform(updatedAt: string, ...args: unknown[]): string {
    const updatedDate = new Date(updatedAt);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - updatedDate.getTime();

    const hoursAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));

    if (hoursAgo === 0) {
      return 'Just now';
    } else if (hoursAgo === 1) {
      return '1 hour ago';
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
    }
  }
}
