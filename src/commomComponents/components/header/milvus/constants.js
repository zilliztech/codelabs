// get env in vite
const isDev = import.meta.env.MODE === "development";

export const MENU = [
  {
    label: "Docs",
    href: isDev ? "/docs" : "https://milvus.io/docs",
    isExternal: false,
  },
  {
    label: "Tutorials",
    subMenu: [
      {
        label: "Bootcamp",
        href: isDev ? "/bootcamp" : "https://milvus.io/bootcamp",
        isExternal: false,
      },
      {
        label: "Demo",
        href: isDev ? "/milvus-demos" : "https://milvus.io/milus-demos",
        isExternal: false,
      },
      {
        label: "Video",
        href: "https://www.youtube.com/c/MilvusVectorDatabase",
        isExternal: true,
      },
    ],
  },
  {
    label: "Tools",
    subMenu: [
      {
        label: "attu",
        href: "https://github.com/zilliztech/attu",
        isExternal: true,
      },
      {
        label: "Milvus_Cli",
        href: "https://github.com/zilliztech/milvus_cli",
        isExternal: true,
      },
      {
        label: "sizing",
        href: isDev ? "/tools/sizing" : "https://milvus.io/tools/sizing",
        isExternal: false,
      },
    ],
  },
  {
    label: "Blog",
    href: isDev ? "/blog" : "https://milvus.io/blog",
    isExternal: false,
  },
  {
    label: "Community",
    href: isDev ? "/community" : "https://milvus.io/community",
    isExternal: false,
  },
];
