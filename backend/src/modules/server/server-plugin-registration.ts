import { Plugin, Server, ServerRegisterOptions } from '@hapi/hapi';

type PluginOptions = any;

type PluginRegistration =
  | Plugin<PluginOptions>
  | [Plugin<PluginOptions>, ServerRegisterOptions]
  | [[Plugin<PluginOptions>, PluginOptions], ServerRegisterOptions];

export type PluginList = PluginRegistration[];

/**
 * Register plugins to the server
 * @param server hapi server
 * @param plugins plugin registration list
 */
export async function registerPlugins(server: Server, plugins: PluginList): Promise<void> {
  await Promise.all(
    plugins.map(async params => {
      const [pluginObject, registerOptions] = Array.isArray(params)
        ? Array.isArray(params[0])
          ? [{ plugin: params[0][0], options: params[0][1] }, params[1]]
          : [{ plugin: params[0], options: {} }, params[1]]
        : [{ plugin: params, options: {} }, {}];
      await server.register(pluginObject, registerOptions);
    })
  );
}
