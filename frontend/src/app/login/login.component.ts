import { Component, HostListener } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  showBase: boolean = true;
  code: string = '';
  contrasena: string = '';
  user: Usuario | null = null;
  mensajeError = '';
  cargando = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) { }
  ngOnInit() {
    this.usuarioService.borrarCache();
  }
  toggleDisplay(): void {
    this.showBase = !this.showBase;
    console.log('Button clicked, showBase:', this.showBase); // Para depuración
  }

  // Método para manejar clics en cualquier parte del documento
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const rectangle = document.getElementById('rectangle');
    if (rectangle && !rectangle.contains(target)) {
      if (!this.showBase) {
        this.showBase = true;
        console.log('Clicked outside, showBase:', this.showBase); // Para depuración
      }
    }
  }

  consulta(): void {
    this.mensajeError = '';

    if (!this.code.trim() || !this.contrasena) {
      this.mensajeError = 'Ingrese el usuario y la contraseña.';
      return;
    }

    this.cargando = true;
    this.usuarioService.consultarUsuario(this.code.trim(), this.contrasena).subscribe({
      next: response => {
        localStorage.setItem('usuarioRegistrado', JSON.stringify(response));
        this.user = response;

        if (this.user.rol === 'Estudiante') {
          this.authService.login();
          this.router.navigate(['/lobby']);
        } else if (this.user.rol === 'Admin') {
          this.authService.login();
          this.router.navigate(['/admin']);
        } else {
          this.mensajeError = 'El usuario no tiene un rol válido.';
        }
        this.cargando = false;
      },
      error: error => {
        this.cargando = false;
        this.mensajeError = error.status === 401
          ? 'Usuario o contraseña incorrectos.'
          : 'No fue posible iniciar sesión. Intente nuevamente.';
      }
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  obtenerUsuarioDeLocalStorage(): any {
    const usuarioString = localStorage.getItem('usuarioRegistrado');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      console.log('Usuario cargado desde localStorage:', this.user);
      return this.user;
    } else {
      console.log('No se encontró usuario en localStorage');
      return null;
    }

  }
}


