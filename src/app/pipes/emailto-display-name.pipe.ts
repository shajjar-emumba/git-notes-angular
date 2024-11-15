import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailtoDisplayName',
  standalone: true,
})
export class EmailtoDisplayNamePipe implements PipeTransform {
  transform(email: string, ...args: unknown[]) {
    if (!email) return '';
    const displayName = email.split('@')[0];
    return displayName
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
