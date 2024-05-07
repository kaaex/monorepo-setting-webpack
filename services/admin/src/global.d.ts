declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const className: IClassNames;
  export = className;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.svg";
declare const _PLATFORM_: "mobile" | "desktop";
