import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export const supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

export class AuthService {
  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  }
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }
  async signOut() {
    return supabase.auth.signOut();
  }
  getUser() {
    return supabase.auth.getUser();
  }
  onAuthStateChange(cb:any) {
    return supabase.auth.onAuthStateChange(cb);
  }
}
