// get env in vite
let isExternal;
const isExternalProject = import.meta.env.VITE_IS_EXXTERNAL_LINK;
const isDev = import.meta.env.MODE === "development";

if (isExternalProject) {
  isExternal = true;
} else {
  isExternal = !isDev;
}

export const MENU = [
  {
    label: "Docs",
    href: !isExternal ? "/docs" : "https://milvus.io/docs",
    isExternal: isExternal,
  },
  // {
  //   label: "Tutorials",
  //   subMenu: [
  //     {
  //       label: "Bootcamp",
  //       href: !isExternal ? "/bootcamp" : "https://milvus.io/bootcamp",
  //       isExternal: isExternal,
  //     },
  //     {
  //       label: "Demo",
  //       href: !isExternal ? "/milvus-demos" : "https://milvus.io/milus-demos",
  //       isExternal: isExternal,
  //     },
  //     {
  //       label: "Video",
  //       href: "https://www.youtube.com/c/MilvusVectorDatabase",
  //       isExternal: true,
  //     },
  //   ],
  // },
  {
    label: "Codelabs",
    href: "/",
    isExternal: false,
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
        href: !isExternal ? "/tools/sizing" : "https://milvus.io/tools/sizing",
        isExternal: isExternal,
      },
    ],
  },
  {
    label: "Blog",
    href: !isExternal ? "/blog" : "https://milvus.io/blog",
    isExternal: isExternal,
  },
  {
    label: "Community",
    href: !isExternal ? "/community" : "https://milvus.io/community",
    isExternal: isExternal,
  },
];
