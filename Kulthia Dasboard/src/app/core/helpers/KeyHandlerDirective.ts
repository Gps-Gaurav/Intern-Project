import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[keyHandler]'
})
export class KeyHandlerDirective {

    @HostListener('keydown.shift.tab', ['$event'])
    onKeyDown(e) {
        // optionally use preventDefault() if your combination
        // triggers other events (moving focus in case of Shift+Tab)
        // e.preventDefault();
        console.log('shift and tab');
    }
}