import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {SharedServices} from "../shared.services";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private router: Router, private sharedService: SharedServices) {
  }

  @Input() title = '';
  imagePath = 'assets/icons/sun.svg';
  darkMode = false;
  profileOpen = false;
  toolbarOpen = false;
  isLoggedIn = false;
  isAdminLoggedIn = false;
  searchQuery = '';
  body = document.getElementById('mainBody');
  account = document.getElementsByClassName('account');
  toolbar = document.getElementsByClassName('toolbar');
  menuImg = document.getElementsByClassName('menu-img');
  refreshFlag: boolean = false;
  adminName = '';
  userName = '';

  ngOnInit() {
    this.getTheme()
    this.getLoggedInStatus()
    // refresh content when routes change
    this.sharedService.getRefreshFlag().subscribe(value => {
      this.refreshFlag = value;// Refresh the content in ngOnInit when the refreshFlag is true
      if (this.refreshFlag) {
        this.getLoggedInStatus();
        this.sharedService.setRefreshFlag(false); // Reset the refreshFlag
        this.refreshFlag = false;
        if (this.profileOpen) {
          this.profileClicked()
        }
        if (this.toolbarOpen){
          this.openCloseToolBar()
        }
      }
    });
  }

  // get stored theme and change theme accordingly
  getTheme() {
    if (sessionStorage.getItem('theme') == 'dark') {
      this.imagePath = 'assets/icons/moon_symbol.svg';
      // @ts-ignore
      this.body.classList.add('dark');
    } else {
      this.imagePath = 'assets/icons/sun.svg';
      // @ts-ignore
      this.body.classList.remove('dark');
    }
  }

  openCloseToolBar() {
    this.toolbarOpen = !this.toolbarOpen
    for (let i = 0; i < this.toolbar.length; i++) {
      this.toolbar[i].classList.toggle('visible');
    }
  }

  getLoggedInStatus() {
    // get the current stores user in session
    const currentUser = sessionStorage.getItem('currentUser');
    // @ts-ignore
    this.userName = currentUser;
    if (!currentUser) {
      // User is not logged in, redirect to login page or show appropriate message
      // this.router.navigate(['/accounts']);
      this.isLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentUser)
      this.isLoggedIn = true;
    }
    const currentAdmin = sessionStorage.getItem('currentAdmin');
    // @ts-ignore
    this.adminName = currentAdmin;
    if (!currentAdmin) {
      // User is not logged in, redirect to login page or show appropriate message
      // this.router.navigate(['/accounts']);
      this.isAdminLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      // console.log(currentAdmin)
      this.isAdminLoggedIn = true;
    }
  }

  // handle user account click
  redirectToLogIn() {
    if (this.isLoggedIn) {
      sessionStorage.removeItem('currentUser')
      this.isLoggedIn = false
      this.userName = ''
    } else {
      this.router.navigate(['/accounts']);
    }
  }

  // handle admin account click
  redirectToAdminLogIn() {
    if (this.isAdminLoggedIn) {
      sessionStorage.removeItem('currentAdmin')
      this.isAdminLoggedIn = false
      this.adminName = ''
    } else {
      this.router.navigate(['/admins']);
    }
  }


  getText(): string {
    if (this.isLoggedIn) {
      return "Log Out"
    } else {
      return "Log In"
    }
  }

  getAdminText(): string {
    if (this.isAdminLoggedIn) {
      return "Log Out"
    } else {
      return "Log In"
    }
  }

  // handle changing of themes
  themeChanged() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.imagePath = 'assets/icons/moon_symbol.svg';
      // @ts-ignore
      this.body.classList.add('dark');
      sessionStorage.setItem('theme', 'dark')
    } else {
      this.imagePath = 'assets/icons/sun.svg';
      // @ts-ignore
      this.body.classList.remove('dark');
      sessionStorage.setItem('theme', 'light')
    }
  }

  // handle clicking of the profile icon
  profileClicked() {
    this.profileOpen = !this.profileOpen;
    for (let i = 0; i < this.account.length; i++) {
      this.account[i].classList.toggle('visible');
    }
  }

  searchProduct() {
    alert(this.searchQuery);
  }
}
