/**
 * 该文件用于解决tsx文件中导入svg时出现"Cannot find module 'xxx.svg'"错误
 */
declare module "*.svg" {
  const content: any;
  const ReactComponent:React.VFC<React.SVGProps<SVGSVGElement>>
  export {
    ReactComponent
  }
  export default content;
}

declare module "*.svg?component"{
  const content: any;
  const ReactComponent:React.VFC<React.SVGProps<SVGSVGElement>>
  export {
    ReactComponent
  }
  export default content;
}