type BoardModel = {
  id: string,
  title: string,
};

type BoardsModel = BoardModel[];

const MOCK_BOARDS: BoardsModel = [
  {
    "id": "b97690b3-d6f0-4e91-97f1-56580b11125f",
    "title": "My Super Important Board#1"
  },
  {
    "id": "45698fac-db9e-4d53-9d69-bdab36f6100d",
    "title": "My Super Important Board#2"
  },
  {
    "id": "64578db4-bacc-4f91-b70a-53ba3d28ba52",
    "title": "My Super Important Board#3"
  },
  {
    "id": "b97690b3-d6f0-4e91-97f1-56580b11125f",
    "title": "My Super Important Board#4"
  },
  {
    "id": "45698fac-db9e-4d53-9d69-bdab36f6100d",
    "title": "My Super Important Board#5"
  },
  {
    "id": "64578db4-bacc-4f91-b70a-53ba3d28ba52",
    "title": "My Super Important Board#6"
  },
  {
    "id": "b97690b3-d6f0-4e91-97f1-56580b11125f",
    "title": "My Super Important Board#7"
  },
  {
    "id": "45698fac-db9e-4d53-9d69-bdab36f6100d",
    "title": "My Super Important Board#8"
  },
  {
    "id": "64578db4-bacc-4f91-b70a-53ba3d28ba52",
    "title": "My Super Important Board#9"
  },
  {
    "id": "64578db4-bacc-4f91-b70a-53ba3d28ba52",
    "title": "My Super Important Board#10"
  },
];

export {
  BoardsModel,
  BoardModel,
  MOCK_BOARDS,
};
