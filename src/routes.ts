import { BbegController } from "./controller/BbegController";
import { AlignmentController } from "./controller/AlignmentController";
import { CampaignController } from "./controller/CampaignController";
import { CharacterController } from "./controller/CharacterController";
import { EventController } from "./controller/EventController";
import { ItemController } from "./controller/ItemController";
import { InventoryController } from "./controller/InventoryController";
import { ShopController } from "./controller/ShopController";

export const Routes = [
	// Routes for BbegController (Big Bad Evil Guy)
	{
		method: "get", // HTTP GET method
		route: "/bbegs", // Route path
		controller: BbegController, // Controller class
		action: "all", // Controller method to execute
	},
	{
		method: "get",
		route: "/bbegs/:id", // :id is a route parameter
		controller: BbegController,
		action: "one",
	},
	{
		method: "post", // HTTP POST method
		route: "/bbegs",
		controller: BbegController,
		action: "save",
	},
	{
		method: "put", // HTTP PUT method
		route: "/bbegs/:id",
		controller: BbegController,
		action: "update",
	},
	{
		method: "delete", // HTTP DELETE method
		route: "/bbegs/:id",
		controller: BbegController,
		action: "remove",
	},

	// Routes for AlignmentController
	{
		method: "get",
		route: "/alignments",
		controller: AlignmentController,
		action: "all",
	},
	{
		method: "get",
		route: "/alignments/:alignment", // :alignment is a route parameter
		controller: AlignmentController,
		action: "one",
	},
	{
		method: "post",
		route: "/alignments",
		controller: AlignmentController,
		action: "save",
	},
	{
		method: "put",
		route: "/alignments/:alignment",
		controller: AlignmentController,
		action: "update",
	},
	{
		method: "delete",
		route: "/alignments/:alignment",
		controller: AlignmentController,
		action: "remove",
	},

	// Routes for CampaignController
	{
		method: "get",
		route: "/campaigns",
		controller: CampaignController,
		action: "all",
	},
	{
		method: "get",
		route: "/campaigns/:id",
		controller: CampaignController,
		action: "one",
	},
	{
		method: "post",
		route: "/campaigns",
		controller: CampaignController,
		action: "save",
	},
	{
		method: "put",
		route: "/campaigns/:id",
		controller: CampaignController,
		action: "update",
	},
	{
		method: "delete",
		route: "/campaigns/:id",
		controller: CampaignController,
		action: "remove",
	},

	// Routes for CharacterController
	{
		method: "get",
		route: "/characters",
		controller: CharacterController,
		action: "all",
	},
	{
		method: "get",
		route: "/characters/:id",
		controller: CharacterController,
		action: "one",
	},
	{
		method: "post",
		route: "/characters",
		controller: CharacterController,
		action: "save",
	},
	{
		method: "put",
		route: "/characters/:id",
		controller: CharacterController,
		action: "update",
	},
	{
		method: "delete",
		route: "/characters/:id",
		controller: CharacterController,
		action: "remove",
	},

	// Routes for EventController
	{
		method: "get",
		route: "/events",
		controller: EventController,
		action: "all",
	},
	{
		method: "get",
		route: "/events/:id",
		controller: EventController,
		action: "one",
	},
	{
		method: "post",
		route: "/events",
		controller: EventController,
		action: "save",
	},
	{
		method: "put",
		route: "/events/:id",
		controller: EventController,
		action: "update",
	},
	{
		method: "delete",
		route: "/events/:id",
		controller: EventController,
		action: "remove",
	},

	// Routes for ItemController
	{
		method: "get",
		route: "/items",
		controller: ItemController,
		action: "all",
	},
	{
		method: "get",
		route: "/items/:id",
		controller: ItemController,
		action: "one",
	},
	{
		method: "post",
		route: "/items",
		controller: ItemController,
		action: "save",
	},
	{
		method: "put",
		route: "/items/:id",
		controller: ItemController,
		action: "update",
	},
	{
		method: "delete",
		route: "/items/:id",
		controller: ItemController,
		action: "remove",
	},
	// Inventory Routes
	{
		method: "get",
		route: "/inventories",
		controller: InventoryController,
		action: "all",
	},
	{
		method: "get",
		route: "/inventories/:id",
		controller: InventoryController,
		action: "one",
	},
	{
		method: "post",
		route: "/inventories",
		controller: InventoryController,
		action: "save",
	},
	{
		method: "put",
		route: "/inventories/:id",
		controller: InventoryController,
		action: "update",
	},
	{
		method: "delete",
		route: "/inventories/:id",
		controller: InventoryController,
		action: "remove",
	},
	// Shop Routes
	{
		method: "get",
		route: "/shops",
		controller: ShopController,
		action: "all",
	},
	{
		method: "get",
		route: "/shops/:id",
		controller: ShopController,
		action: "one",
	},
	{
		method: "post",
		route: "/shops",
		controller: ShopController,
		action: "save",
	},
	{
		method: "put",
		route: "/shops/:id",
		controller: ShopController,
		action: "update",
	},
	{
		method: "delete",
		route: "/shops/:id",
		controller: ShopController,
		action: "remove",
	},
];
