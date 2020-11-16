import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'sbz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("svgEye") svgEye: ElementRef;
  @ViewChild("sclera") sclera: ElementRef;
  @ViewChild("pupil") pupil: ElementRef;

  private readonly minPupilXPos = -45;
  private readonly maxPupilXPos = 45;
  private readonly minPupilYPos = 60;
  private readonly maxPupilYPos = 80;

  private currentPupilXPos = 0;
  private currentPupilYPos = 0;

  emailValue: string = "";
  passwordValue: string = "";
  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  onEmailFocus() {
    this.renderer.setStyle(this.svgEye.nativeElement, "width", "500px");
    this.calculatePupilXPos(this.emailValue.length);
    this.calculatePupilYPos(this.emailValue.length);
    this.renderer.setStyle(
      this.pupil.nativeElement,
      "transform",
      `translate3d(${this.currentPupilXPos}px, ${this.currentPupilYPos}px, 0)`
    );
  }

  onPasswordFocus() {
    this.renderer.setStyle(this.svgEye.nativeElement, "width", "500px");
    this.renderer.setStyle(this.sclera.nativeElement, "fill", "#3F3D56");
  }

  onBlur() {
    this.renderer.setStyle(this.svgEye.nativeElement, "width", "200px");
    this.renderer.setStyle(this.sclera.nativeElement, "fill", "white");
    this.renderer.setStyle(
      this.pupil.nativeElement,
      "transform",
      `translate3d(0px, 0px, 0)`
    );
  }

  onEmailChange(e: string) {
    this.calculatePupilXPos(e.length);
    this.calculatePupilYPos(e.length);
    this.renderer.setStyle(
      this.pupil.nativeElement,
      "transform",
      `translate3d(${this.currentPupilXPos}px, ${this.currentPupilYPos}px, 0)`
    );
  }

  calculatePupilXPos(length: number) {
    const pos = length + this.minPupilXPos + 3 * length;
    this.currentPupilXPos = pos > this.maxPupilXPos ? this.maxPupilXPos : pos;
  }

  calculatePupilYPos(length: number) {
    if (length < 11) {
      this.currentPupilYPos = this.minPupilYPos + length * 2;
    } else {
      const pos = this.maxPupilYPos - length + 10;
      this.currentPupilYPos = pos > this.minPupilYPos ? pos : this.minPupilYPos;
    }
  }
}