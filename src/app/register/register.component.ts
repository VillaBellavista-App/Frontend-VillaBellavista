import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  togglePasswordVisibility() {
    const lockIcon = document.getElementById("lock") as HTMLElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    if (passwordInput.type !== "password") {
      passwordInput.type = "password";
      lockIcon.classList.remove("bxs-lock-open-alt");
      lockIcon.classList.add("bxs-lock-alt");
    } else {
      passwordInput.type = "text";
      lockIcon.classList.remove("bxs-lock-alt");
      lockIcon.classList.add("bxs-lock-open-alt");
    }
  }
}
