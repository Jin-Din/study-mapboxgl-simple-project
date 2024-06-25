import { InjectionKey, Ref } from "vue";

export interface ILayoutSizeConfig {
  mapInited: Ref<boolean>;
  fullScreen: Ref<boolean>;
  expandPanel: Ref<boolean>;
  // offsetTop: Ref<string>;
  // panelWidth: Ref<string>;
}
export const layoutSizeKey: InjectionKey<ILayoutSizeConfig> = Symbol();
