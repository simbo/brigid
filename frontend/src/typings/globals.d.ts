export {};

declare global {
  const BRIGID_APP_NAME: string;
  const BRIGID_APP_DESCRIPTION: string;
  const BRIGID_APP_VERSION: string;
  const BRIGID_COMMIT_ID: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  let __webpack_public_path__: string;

  interface Window {
    // own window object
    // brigid?: {};

    // angular profiler object
    ng?: {
      profiler: {
        timeChangeDetection(options: { record: boolean }): void;
      };
    };
  }
}
