import { STORAGE_KEYS } from "../constants";
import { getItems } from "./storage";

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const productRepository = {

    async getAll() {

        const response = await fetch(
            `${BASE_URL}/products?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get products");
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/products/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get product");
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/products`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to create product"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/products/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to update product"
            );
        }

        return result;
    },

    async softDelete(id) {

        const response = await fetch(
            `${BASE_URL}/products/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    spam: true,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to remove product"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/products/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete product"
            );
        }

        return result;
    }
};

export {productRepository};