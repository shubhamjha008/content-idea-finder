
import { CanActivateFn } from '@angular/router';
import { supabase } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};
