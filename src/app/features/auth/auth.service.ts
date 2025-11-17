
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/env';
export const supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

export class AuthService {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signInWithProvider(provider: string) {
    // provider e.g. 'google', 'github'
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  }

  getUser() {
    return supabase.auth.getUser();
  }

  onAuthStateChange(cb: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(cb);
  }
}
