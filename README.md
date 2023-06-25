# GeneralBrochureUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## About me

This is a general brochure website created with Angular.

This website demonstrates the use of the BreakPointObserver to respond to changing view widths
- Abstracting the BreakPointObserver into a service allows the observer to be subscribed to once in the applications lifetime and
  other components that need access to the current screen size are able to access the screenSize property within the service.

- What was more fitting in this UI was to make use of the above-mentioned service within a directive that could alter an HTML elements className
  that corresponds to the current screen size.
