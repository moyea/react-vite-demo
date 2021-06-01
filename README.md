# react-vite-demo

该仓库主要为了展示如何将构建工具从Create-React-App切换为vite, 最初项目由CRA生成, 之后将其切换为vite

## 主要变更

### package.json
```diff
     "react-dom": "^17.0.2",
-    "react-scripts": "4.0.3",
+    "ts-jest": "^26.5.6",
     "typescript": "^4.1.2",
+    "vite": "^2.3.2",
+    "vite-tsconfig-paths": "^3.3.10",
     "web-vitals": "^1.0.1"
   },
   "scripts": {
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
-    "eject": "react-scripts eject"
+    "start": "vite",
+    "build": "vite build",
+    "test": "jest"
   },
```

### index.html

index.html 从 public 目录移到了跟目录，同时变更了部分页面中的连接

```diff

-    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
-    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
-    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link rel="icon" href="/favicon.ico" />
+    <link rel="apple-touch-icon" href="/logo192.png" />
+    <link rel="manifest" href="/manifest.json" />

     <div id="root"></div>
+    <script type="module" src="/src/index.tsx"></script>
```

### 添加 vite.config.ts

```diff
+import { defineConfig } from 'vite'
+import tsConfigPaths from 'vite-tsconfig-paths'
+
+export default defineConfig({
+  build: {
+    outDir:'build'
+  },
+  plugins: [
+    tsConfigPaths()
+  ]
+})
```

### 添加 typings/svg.d.ts
为了解决 tsx 中导入 svg 报错的问题
```diff
+/**
+ * 该文件用于解决tsx文件中导入svg时出现"Cannot find module 'xxx.svg'"错误
+ */
+declare module "*.svg" {
+  const content: any;
+  export default content;
+}
```
同时 tsconfig.json 中，添加 typings 目录
```diff
   "include": [
-    "src"
+    "src",
+    "typings"
   ]
```

## 次要变更, 针对 test 部分变更

该部分变更主要是针对 test，如果不需要 test，可以忽略这部分，同时移除 ts-jest 的依赖

### 添加 jest.config.js
```diff
+module.exports = {
+  preset: "ts-jest",
+  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
+  moduleDirectories: ["node_modules", "src"],
+  moduleNameMapper: {
+    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
+    "\\.(css|less|scss|sass)$":"<rootDir>/tests/__mocks__/styleMock.js"
+  }
+}
```

### 添加 tests/__mocks__/fileMock.js 和 tests/__mocks__/styleMock.js

主要为了解决tsx中导入静态文件时，test不通过的问题

#### tests/__mocks__/fileMock.js
```diff
+module.exports="test-file-stub"
```

#### tests/__mocks__/styleMock.js
```diff
+module.exports = {}
```

## 一些问题总结

### 1. Cannot find module 'src/index.tsx'

> index.html 中 `<script type="module" src="/src/index.tsx"></script>` 对应src中的 `/`必须要有，不然会去找 node_modules

### 2. Uncaught ReferenceError: require is not defined

> 使用vite时，源码中不能有 `require` , [尤大的相关回复](https://github.com/vitejs/vite/issues/728#issuecomment-760260219)

