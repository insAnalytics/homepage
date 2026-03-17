import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = false;
  menuOpen = false;
  dropdownOpen = false;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openDropdown() {
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.closeTimer = setTimeout(() => { this.dropdownOpen = false; }, 150);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  smoothScroll(event: Event, id: string) {
    event.preventDefault();
    this.menuOpen = false;
    this.dropdownOpen = false;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
