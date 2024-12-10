export const initialTreeData = [
    {
      name: "Documents",
      type: "folder",
      isOpen: true,
      children: [
        { name: "Document1.jpg", type: "file" },
        { name: "Document2.jpg", type: "file" },
        { name: "Document3.jpg", type: "file" },
      ],
    },
    {
      name: "Desktop",
      type: "folder",
      isOpen: true,
      children: [
        { name: "Screenshot1.jpg", type: "file" },
        { name: "videopal.mp4", type: "file" },
      ],
    },
    {
      name: "Downloads",
      type: "folder",
      isOpen: true,
      children: [
        {
          name: "Drivers",
          type: "folder",
          isOpen: true,
          children: [
            { name: "Printerdriver.dmg", type: "file" },
            { name: "cameradriver.dmg", type: "file" },
          ],
        },
      ],
    },
    {
      name: "Applications",
      type: "folder",
      isOpen: true,
      children: [
        { name: "Webstorm.dmg", type: "file" },
        { name: "Pycharm.dmg", type: "file" },
        { name: "Webstorm.dmg", type: "file" },
        { name: "Pycharm.dmg", type: "file" },
      ],
    },
    {
      name: "chromedriver.dmg",
      type: "file",
    },
  ];
  