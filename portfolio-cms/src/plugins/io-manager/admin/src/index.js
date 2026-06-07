import PluginIcon from './components/PluginIcon';

const pluginId = 'io-manager';

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'IO Manager',
      },
      Component: () => import('./pages/App'),
      permissions: [],
      position: 3,
    });

    app.registerPlugin({
      id: pluginId,
      initializer: () => null,
      injectionZones: {},
      isReady: true,
      name: pluginId,
    });
  },
  bootstrap() {},
};
