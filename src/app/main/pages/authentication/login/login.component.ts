import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { SessionService } from "app/services/session/session.service";

@Component({
  selector: "app-auth-login-v2",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private sessionService: SessionService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    this.sessionService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe((data) => {
        // stop loading
        this.loading = false;

        // check success
        if (data["success"]) {
          const session = data["session"];
          const accessToken = session["access_token"];
          if (accessToken != null) {
            this.sessionService.saveAccessToken(accessToken);
            this.goToMain();
          }
        }
      });
  }

  checkAuthenticated() {
    const isAuth = this.sessionService.checkAuth();

    if (isAuth) {
      this.goToMain();
    }
  }

  goToMain() {
    // go to home
    this._router.navigate(["/"]);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.checkAuthenticated();
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";

    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
