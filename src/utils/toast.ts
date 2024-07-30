import {
  isPermissionGranted,
  Options,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';

/**
 * showSystemToast
 * @param options
 */
export const showSystemToast = async (options: Options | string) => {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) {
    sendNotification(options);
  }
};
