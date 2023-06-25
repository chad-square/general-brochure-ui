import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-component-heading',
  templateUrl: './component-heading.component.html',
  styleUrls: ['./component-heading.component.scss']
})
export class ComponentHeadingComponent {

  @Input() headingText: String | undefined

}
