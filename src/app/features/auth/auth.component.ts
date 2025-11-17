import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  template: `
    <div class="bg-white p-4 rounded shadow">
      <div *ngIf="!user">
        <form (submit)="signIn($event)" class="flex gap-2 items-end">
          <input [(ngModel)]="email" name="email" placeholder="email" class="border rounded px-2 py-1" />
          <input [(ngModel)]="password" name="password" type="password" placeholder="password" class="border rounded px-2 py-1" />
          <button class="bg-teal-600 text-white px-3 py-1 rounded">Sign In</button>
          <button class="bg-slate-200 px-3 py-1 rounded" (click)="signUp($event)">Sign Up</button>
        </form>
      </div>
      <div *ngIf="user">
        <p>Signed in as {{user.email}}</p>
        <button (click)="signOut()" class="bg-red-500 text-white px-3 py-1 rounded">Sign out</button>
      </div>
    </div>
  `
})
export class AuthComponent {
  email = '';
  password = '';
  user: any = null;
  private svc = new AuthService();

  constructor() {
    this.svc.getUser().then(r => {
      this.user = r?.data?.user ?? null;
    });
    this.svc.onAuthStateChange((event:any, session:any) => {
      this.user = session?.user ?? null;
    });
  }

  async signIn(e:any) {
    e.preventDefault();
    try {
      await this.svc.signIn(this.email, this.password);
      alert('Signed in');
    } catch (err:any) {
      alert(err.message || err);
    }
  }

  async signUp(e:any) {
    e.preventDefault();
    try {
      await this.svc.signUp(this.email, this.password);
      alert('Check your email to confirm sign‑up');
    } catch (err:any) {
      alert(err.message || err);
    }
  }

  async signOut() {
    await this.svc.signOut();
    this.user = null;
  }
}
