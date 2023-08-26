import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.services";
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  isLoading: boolean = false;

  userFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private route: Router, private elementRef: ElementRef, private userService: UserService) {
    
  }

  ngAfterViewInit() {}

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
  
  login() {
    if (this.userFormGroup.valid) {
      this.isLoading = true;
      const email = <undefined>this.userFormGroup.get('email')?.value;
      const password = <undefined>this.userFormGroup.get('password')?.value;
  
      if (email !== undefined && password !== undefined) {
        this.userService.authenticate(email, password).subscribe(
          (user: User[]) => {
            if (user.length > 0) {
              localStorage.setItem('user', JSON.stringify(user[0].user_role));
              this.route.navigate(['/departures']);
            } else {
              this.userFormGroup.setValue({ email: '', password: '' });
              this.isLoading = false;
            }
          },
        );
      } else {
        console.log('Email or password is undefined');
        this.isLoading = false;
      }
    }
  }
  

}
