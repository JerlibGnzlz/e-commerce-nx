import { relations } from "drizzle-orm/relations";
import { orders, orderDetails, products, users } from "./schema";

export const orderDetailsRelations = relations(orderDetails, ({one}) => ({
	order: one(orders, {
		fields: [orderDetails.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderDetails.productId],
		references: [products.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	orderDetails: many(orderDetails),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	orderDetails: many(orderDetails),
	user: one(users, {
		fields: [products.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	products: many(products),
	orders: many(orders),
}));