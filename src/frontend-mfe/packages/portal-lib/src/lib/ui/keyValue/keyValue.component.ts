import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'lib-key-value',
    templateUrl: './keyValue.component.html',
    styleUrls: ['./keyValue.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueComponent {
    key = input.required<string>();
    value = input.required<string>();
    keyValueColArea = input("12");
    clazz = input("");
}
