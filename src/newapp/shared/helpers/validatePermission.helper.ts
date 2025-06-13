export function validatePermission(permissions: string[] | string, per: string) {
  return typeof permissions === 'string'
    ? permissions === 'all' || permissions.includes(per)
    : permissions?.indexOf(per) >= 0;
}
