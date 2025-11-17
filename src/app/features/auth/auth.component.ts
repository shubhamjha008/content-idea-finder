
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, supabase } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white p-6 rounded shadow max-w-md">
      <h2 class="text-xl font-semibold mb-4">Sign in / Sign up</h2>

      <form (submit)="onSignIn($event)" class="space-y-3">
        <div>
          <label class="block text-sm">Email</label>
          <input [(ngModel)]="email" name="email" class="mt-1 block w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm">Password</label>
          <input [(ngModel)]="password" name="password" type="password" class="mt-1 block w-full rounded border px-3 py-2" required />
        </div>
        <div class="flex gap-2">
          <button class="bg-teal-600 text-white px-4 py-2 rounded" (click)="onSignIn($event)">Sign in</button>
          <button class="bg-slate-200 px-4 py-2 rounded" (click)="onSignUp($event)">Sign up</button>
        </div>
      </form>

      <div class="mt-4">
        <p class="text-sm text-slate-600 mb-2">Or sign in with</p>
        <div class="flex gap-2">
          <button class="px-3 py-2 rounded border" (click)="onOAuth('google')">Google</button>
          <button class="px-3 py-2 rounded border" (click)="onOAuth('github')">GitHub</button>
        </div>
      </div>

      <div *ngIf="user" class="mt-4 border-t pt-3">
        <p class="text-sm">Signed in as: <strong>{{user.email}}</strong></p>
        <button class="mt-2 bg-red-500 text-white px-3 py-1 rounded" (click)="onSignOut()">Sign out</button>
      </div>
    </div>
  `
})
export class AuthComponent {
  email = '';
  password = '';
  user: any = null;
  private auth = new AuthService();

  constructor() {
    // try to load session user
    supabase.auth.getSession().then(r => {
      if (r.data?.session?.user) this.user = r.data.session.user;
    });
    this.auth.onAuthStateChange((event, session) => {
      if (session?.user) this.user = session.user;
      else this.user = null;
    });
  }

  async onSignUp(e: Event) {
    e.preventDefault();
    try {
      await this.auth.signUp(this.email, this.password);
      alert('Sign-up successful. Check your email for confirmation.');
    } catch (err: any) {
      alert('Sign-up error: ' + err.message);
    }
  }

  async onSignIn(e: Event) {
    e.preventDefault();
    try {
      await this.auth.signIn(this.email, this.password);
      alert('Signed in');
      const user = await (await this.auth.getUser()).data?.user;
      this.user = user;
    } catch (err: any) {
      alert('Sign-in error: ' + err.message);
    }
  }

  async onOAuth(provider: string) {
    try {
      await this.auth.signInWithProvider(provider);
      // OAuth redirects to Supabase hosted page. After auth, user returns to app.
    } catch (err: any) {
      alert('OAuth error: ' + err.message);
    }
  }

  async onSignOut() {
    await this.auth.signOut();
    this.user = null;
    alert('Signed out');
  }
}
