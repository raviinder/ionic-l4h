export type Role = 'admin' | 'manager' | 'user'| 'superadmin';

export interface User {
    uid?: string;
    displayName?: string;
    role?: Role;
    email?: string;
}
