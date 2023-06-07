import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { ProfileMenuComponent } from 'src/app/layout/components/profilemenu/profilemenu.component';
import { LayoutService } from 'src/app/layout/services/layout.service';
@TraceClassMethods()
@Component({
    selector: 'app-rightmenu',
    templateUrl: './rightmenu.component.html',
    standalone: true,
    imports: [NgIf, NgClass, ProfileMenuComponent, AsyncPipe],
})
export class RightMenuComponent implements OnInit {
    @ViewChild(ProfileMenuComponent) profileMenuComponent!: ProfileMenuComponent;

    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    ngOnInit() {}
}
