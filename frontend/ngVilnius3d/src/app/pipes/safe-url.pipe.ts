import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanatizerUrl: DomSanitizer) {}

  transform(url: string = ''): SafeScript {
    return this.sanatizerUrl.bypassSecurityTrustResourceUrl(url);
  }

}
